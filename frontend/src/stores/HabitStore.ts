import {action, observable} from 'mobx';
import shortid from 'shortid';
import {HabitBackend} from '../backend/HabitBackend';
import {DateRange} from '../model/DateRange';
import {Day} from '../model/Day';
import {Habit} from '../model/Habit';
import {HabitData} from '../model/HabitData';
import {HabitPerformanceData} from '../model/HabitPerformanceData';

export class HabitStore {

    backend: HabitBackend;

    @observable
    range: DateRange;
    @observable
    data: HabitData;

    @action
    async setRange(range: DateRange) {
        this.range = range;

        this.data = await this.backend.getHabitData(range);
    }

    @action
    async createHabit(props: Partial<Habit>) {
        const habit = new Habit();
        habit.id = shortid.generate();
        Object.assign(habit, props);
        await this.backend.saveHabit(habit);

        // Create performance row
        const performance = new HabitPerformanceData(habit, this.range);

        this.data.performances.push(performance);
    }

    @action
    async changeHabit(habit: Habit, changes: Partial<Habit>) {
        habit = Object.assign(habit, changes);
        await this.backend.saveHabit(habit);
    }

    @action
    async setHabitPerformed(habit: Habit, day: Day, performed: boolean) {

        await this.backend.setPerformed(habit, day, performed);

        const performance = this.getHabitPerformance(habit);

        performance.setPerformed(day, performed);
    }

    private getHabitPerformance(habit: Habit) {
        return this.data.performances.find(performance => performance.habit.id === habit.id);
    }
}
