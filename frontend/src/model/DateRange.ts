import {LocaleUtil} from '../util/LocaleUtil';
import {Day} from './Day';

export class DateRange {

    from: Day;
    to: Day;

    days: Day[] = [];

    contains(day: Day) {
        return this.from.key <= day.key
            && this.to.key >= day.key;
    }

    randomDay() {
        if (this.days.length == 0) return this.from;
        return this.days[Math.floor(Math.random() * this.days.length)];
    }

    next(): DateRange {
        // Not implemented
        return this;
    }

    previous(): DateRange {
        // Not implemented
        return this;
    }

    get label() {
        // Not implemented
        return '';
    }

    constructor(from: Day, to: Day) {
        this.from = from;
        this.to = to;

        const days = [];
        let current = from.clone();

        while (!current.after(to)) {
            days.push(current);
            current = current.next();
        }

        this.days = days;
    }
}

export class WeekRange extends DateRange {
    next() {
        const nextStart = Day.from(this.from.year, this.from.month, this.from.date + 7);
        const nextEnd = Day.from(nextStart.year, nextStart.month, nextStart.date + 6);

        return new WeekRange(nextStart, nextEnd);
    }

    previous() {
        const nextStart = Day.from(this.from.year, this.from.month, this.from.date - 7);
        const nextEnd = Day.from(nextStart.year, nextStart.month, nextStart.date + 6);

        return new WeekRange(nextStart, nextEnd);
    }

    get label() {
        // Not implemented
        return '';
    }

    static current() {
        const today = new Date();

        while (today.getDay() > 0) {
            today.setDate(today.getDate() - 1);
        }

        const nextStart = Day.from(today.getFullYear(), today.getMonth(), today.getDate());
        const nextEnd = Day.from(nextStart.year, nextStart.month, nextStart.date + 6);

        return new MonthRange(nextStart, nextEnd);
    }
}

export class MonthRange extends DateRange {
    next() {
        const nextStart = Day.from(this.from.year, this.from.month + 1, 1);
        const nextEnd = Day.from(nextStart.year, nextStart.month + 1, 0);

        return new MonthRange(nextStart, nextEnd);
    }

    previous() {
        const nextStart = Day.from(this.from.year, this.from.month - 1, 1);
        const nextEnd = Day.from(nextStart.year, nextStart.month + 1, 0);

        return new MonthRange(nextStart, nextEnd);
    }

    get label() {
        return LocaleUtil.getFullMonthName(this.from.month);
    }

    static current() {
        const today = new Date();
        const nextStart = Day.from(today.getFullYear(), today.getMonth(), 1);
        const nextEnd = Day.from(nextStart.year, nextStart.month + 1, 0);

        return new MonthRange(nextStart, nextEnd);
    }
}
