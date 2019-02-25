import {action, observable} from 'mobx';
import {DateRange} from './DateRange';
import {Day} from './Day';
import {Habit} from './Habit';
import {HabitPerformed} from './HabitPerformed';

export class HabitPerformanceData {

    habit: Habit;
    range: DateRange;

    @observable
    _data: number[] = [];

    constructor(habit: Habit, range: DateRange, performances: HabitPerformed[] = null) {
        this.habit = habit;
        this.range = range;

        if (performances) {
            performances.forEach(performance => this.setPerformed(Day.fromKey(performance.dateKey), true));
        }
    }

    isPerformed(day: Day) {
        return this._data.indexOf(day.key) >= 0;
    }

    @action
    setPerformed(day: Day, done: boolean) {
        if (this.isPerformed(day)) {
            this._data.splice(this._data.indexOf(day.key), 1);
        }

        if (done) {
            this._data.push(day.key);
        }
    }
}
