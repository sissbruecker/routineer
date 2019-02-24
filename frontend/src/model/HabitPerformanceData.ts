import {DateRange} from './DateRange';
import {Day} from './Day';
import {Habit} from './Habit';
import {HabitPerformed} from './HabitPerformed';

export class HabitPerformanceData {

    habit: Habit;
    range: DateRange;

    private _data: any = {};

    constructor(habit: Habit, range: DateRange, performances: HabitPerformed[] = null) {
        this.habit = habit;
        this.range = range;
        this._data = range.days.map(() => false);

        if (performances) {
            performances.forEach(performance => this.setPerformed(Day.fromKey(performance.dateKey), true));
        }
    }

    isPerformed(day: Day) {
        return this._data[day.key];
    }

    setPerformed(day: Day, done: boolean) {
        if (!this.range.contains(day)) return;
        this._data[day.key] = done;
    }
}
