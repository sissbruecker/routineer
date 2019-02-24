import shortid from 'shortid';
import {LocalHabitBackend} from './backend/LocalHabitBackend';
import {MonthRange} from './model/DateRange';
import {Habit} from './model/Habit';
import {HabitData} from './model/HabitData';
import {HabitPerformanceData} from './model/HabitPerformanceData';

export class DummyData {

    static async setupData() {

        const range = MonthRange.current();

        const habit1 = new Habit();
        habit1.name = 'Morning meditation';
        const habit2 = new Habit();
        habit2.name = 'Morning yoga';
        habit2.color = 'aquamarine';
        const habit3 = new Habit();
        habit3.name = 'Morning reflection';
        habit3.color = 'fuchsia';

        const performance1 = new HabitPerformanceData(habit1, range);
        const performance2 = new HabitPerformanceData(habit2, range);
        const performance3 = new HabitPerformanceData(habit3, range);

        performance1.setPerformed(range.randomDay(), true);
        performance1.setPerformed(range.randomDay(), true);
        performance1.setPerformed(range.randomDay(), true);
        performance1.setPerformed(range.randomDay(), true);

        performance2.setPerformed(range.randomDay(), true);
        performance2.setPerformed(range.randomDay(), true);
        performance2.setPerformed(range.randomDay(), true);
        performance2.setPerformed(range.randomDay(), true);

        performance3.setPerformed(range.randomDay(), true);
        performance3.setPerformed(range.randomDay(), true);
        performance3.setPerformed(range.randomDay(), true);
        performance3.setPerformed(range.randomDay(), true);

        return new HabitData(range, [performance1, performance2, performance3]);
    }

    static async setupFromDb() {

        const backend = new LocalHabitBackend();
        const range = MonthRange.current();
        const habits = await backend.getHabits();

        async function createHabit(name: string, color: string = null) {

            const exists = habits.some(habit => habit.name === name);

            if (exists) return;

            const habit = new Habit();
            habit.id = shortid.generate();
            habit.name = name;
            habit.color = color;

            await backend.saveHabit(habit);

            // await backend.setPerformed(habit, range.randomDay(), true);
            // await backend.setPerformed(habit, range.randomDay(), true);
            await backend.setPerformed(habit, range.from, true);
            await backend.setPerformed(habit, range.from, true);
            await backend.setPerformed(habit, range.randomDay(), true);
            await backend.setPerformed(habit, range.randomDay(), true);
            await backend.setPerformed(habit, range.randomDay(), true);
        }

        await createHabit('Morning meditation');
        await createHabit('Morning yoga', 'aquamarine');
        await createHabit('Morning reflection', 'fuchsia');

        return backend.getHabitData(range);
    }
}
