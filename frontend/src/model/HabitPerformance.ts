import {Habit} from './Habit';
import {DateRange} from './DateRange';
import {Day} from './Day';

export class HabitPerformance {

    habit: Habit;
    range: DateRange;

    private _data: any = {};

    constructor(habit: Habit, range: DateRange) {
        this.habit = habit;
        this.range = range;
        this._data = range.days.map(() => false);
    }

    isPerformed(day: Day) {
        return this._data[day.key];
    }

    setPerformed(day: Day, done: boolean) {
        if (!this.range.contains(day)) return;
        this._data[day.key] = done;
    }
}
