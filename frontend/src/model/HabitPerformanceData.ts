import {action, observable} from 'mobx';
import {Day} from './Day';
import {Habit} from './Habit';
import {HabitPerformed} from './HabitPerformed';

export class HabitPerformanceData {

    habit: Habit;

    @observable
    data: number[] = [];

    constructor(habit: Habit, performances: HabitPerformed[] = null) {
        this.habit = habit;

        if (performances) {
            performances.forEach(performance => this.setPerformed(Day.fromKey(performance.dateKey), true));
        }
    }

    isPerformed(day: Day) {
        return this.data.indexOf(day.key) >= 0;
    }

    @action
    setPerformed(day: Day, done: boolean) {
        if (this.isPerformed(day)) {
            this.data.splice(this.data.indexOf(day.key), 1);
        }

        if (done) {
            this.data.push(day.key);
        }
    }

    static from(values: any): HabitPerformanceData {
        const habit = Habit.from(values.habit);

        return Object.assign(new HabitPerformanceData(habit), {
            data: values.data
                ? values.data.slice()
                : []
        });
    }
}
