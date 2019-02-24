export class Day {

    _date: Date;

    get year(): number {
        return this._date.getFullYear();
    }

    get month(): number {
        return this._date.getMonth();
    }

    get date(): number {
        return this._date.getDate();
    }

    get day(): number {
        return this._date.getDay();
    }

    get key(): number {
        return this._date.getTime();
    }

    equals(other: Day) {
        return this.key === other.key;
    }

    before(other: Day) {
        return this.key < other.key;
    }

    after(other: Day) {
        return this.key > other.key;
    }

    next() {
        return Day.from(this.year, this.month, this.date + 1);
    }

    previous() {
        return Day.from(this.year, this.month, this.date - 1);
    }

    clone() {
        return Day.from(this.year, this.month, this.date);
    }

    static fromDate(date: Date) {
        const resultDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const result = new Day();
        result._date = resultDate;
        return result;
    }

    static fromKey(key: number) {
        const resultDate = new Date(key);
        const result = new Day();
        result._date = resultDate;
        return result;
    }

    static from(year: number, month: number, date: number) {
        const resultDate = new Date(year, month, date);
        const result = new Day();
        result._date = resultDate;
        return result;
    }
}
