import {Habit} from './Habit';
import {Month} from './Month';

export class HabitPerformance {

    habit: Habit;
    month: Month;

    private _data: boolean[] = [];

    constructor(habit: Habit, month: Month) {
        this.habit = habit;
        this.month = month;
        this._data = month.createDatesArray(false);
    }

    isPerformed(day: number) {
        return day < this._data.length
            && this._data[day];
    }

    setPerformed(day: number, done: boolean) {
        if (day >= this._data.length) return;
        this._data[day] = done;
    }
}
