import {DateUtil} from '../util/DateUtil';

export class Month {

    year: number = 0;
    month: number = 0;

    constructor(year: number, month: number) {
        this.year = year;
        this.month = month;
    }

    get key() {
        return `${this.year}-${this.month}`;
    }

    get numberOfDays() {
        return DateUtil.getNumberOfDaysInMonth(new Date(this.year, this.month, 1));
    }

    getDateByDay(day: number) {
        return new Date(this.year, this.month, day + 1);
    }

    createDatesArray(initial: any = 0) {
        const result = new Array(this.numberOfDays);
        for (let i = 0; i < this.numberOfDays; i++) {
            result.push(initial);
        }
        return result;
    }

    static current() {
        const today = new Date();
        return new Month(today.getFullYear(), today.getMonth());
    }
}
