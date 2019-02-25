import {observable} from 'mobx';
import {DateRange} from './DateRange';
import {Day} from './Day';
import {Habit} from './Habit';
import {HabitPerformed} from './HabitPerformed';

export class HabitPerformanceData {

    habit: Habit;
    range: DateRange;

    @observable
    private readonly _data: any = observable({});

    constructor(habit: Habit, range: DateRange, performances: HabitPerformed[] = null) {
        this.habit = habit;
        this.range = range;

        if (performances) {
            performances.forEach(performance => this.setPerformed(Day.fromKey(performance.dateKey), true));
        }
    }

    isPerformed(day: Day) {
        if (!this._data.hasOwnProperty(day.key)) return false;
        return this._data[day.key];
    }

    setPerformed(day: Day, done: boolean) {
        if (!this.range.contains(day)) return;
        this._data[day.key] = done;
    }
}
