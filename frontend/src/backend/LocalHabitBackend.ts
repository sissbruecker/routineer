import {openDb} from 'idb';
import {DateRange} from '../model/DateRange';
import {Day} from '../model/Day';
import {Habit} from '../model/Habit';
import {HabitData} from '../model/HabitData';
import {HabitPerformanceData} from '../model/HabitPerformanceData';
import {HabitPerformed} from '../model/HabitPerformed';
import {HabitBackend} from './HabitBackend';

const DB_NAME = 'routineer';
const COLLECTION_HABITS = 'habits';
const COLLECTION_HABIT_PERFORMANCES = 'habit_performances';
const INDEX_HABIT_PERFORMANCES = 'index_habit_performances';

export class LocalHabitBackend implements HabitBackend {

    private async getDb() {
        return await openDb(DB_NAME, 1, db => {
            switch (db.oldVersion) {
                case 0:
                    db.createObjectStore(COLLECTION_HABITS, { keyPath: 'id' });
                    const habitPerformances = db.createObjectStore(COLLECTION_HABIT_PERFORMANCES, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    habitPerformances.createIndex(INDEX_HABIT_PERFORMANCES, ['habitId', 'dateKey'], { unique: true });
            }
        });
    }

    private async getTransaction(names: string | string[], mode: 'readonly' | 'readwrite' = 'readonly') {
        return (await this.getDb())
            .transaction(names, mode);
    }

    private async getStore(name: string, mode: 'readonly' | 'readwrite' = 'readonly') {
        return (await this.getTransaction(name, mode))
            .objectStore(name);
    }

    async getHabitData(range: DateRange): Promise<HabitData> {

        const habits = await this.getHabits();
        const habitPerformances = await Promise.all(
            // Load performances for each habit
            habits.map(async habit => {
                const performances = await this.getHabitPerformance(habit, range);

                return new HabitPerformanceData(habit, range, performances);
            })
        );

        return new HabitData(range, habitPerformances);
    }

    async getHabits(): Promise<Habit[]> {
        return (await this.getStore(COLLECTION_HABITS))
            .getAll()
            .then(habits => habits.map(Habit.from));
    }

    async saveHabit(habit: Habit): Promise<Habit> {
        await (await this.getStore(COLLECTION_HABITS, 'readwrite'))
            .put(habit);
        return habit;
    }

    async removeHabit(habit: Habit): Promise<any> {
        return (await this.getStore(COLLECTION_HABITS, 'readwrite'))
            .delete(habit.id);
    }

    async setPerformed(habit: Habit, day: Day, performed: boolean): Promise<any> {
        const objectStore = (await this.getDb())
            .transaction(COLLECTION_HABIT_PERFORMANCES, 'readwrite')
            .objectStore(COLLECTION_HABIT_PERFORMANCES);

        if (performed) {
            const performed = new HabitPerformed(habit, day);
            return objectStore.put(performed)
        } else {
            const key = IDBKeyRange.bound([habit.id, day.key], [habit.id, day.key]);
            const performed: HabitPerformed = await objectStore.index(INDEX_HABIT_PERFORMANCES).get(key);

            if (performed) {
                return objectStore.delete(performed.id);
            }
        }
    }

    private async getHabitPerformance(habit: Habit, range: DateRange): Promise<HabitPerformed[]> {

        const keyRange = IDBKeyRange.bound(
            [habit.id, range.from.key],
            [habit.id, range.to.key]
        );

        return (await this.getStore(COLLECTION_HABIT_PERFORMANCES, 'readonly'))
            .index(INDEX_HABIT_PERFORMANCES)
            .getAll(keyRange);
    }
}
