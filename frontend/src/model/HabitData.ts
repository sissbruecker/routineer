import {observable} from 'mobx';
import {DateRange} from './DateRange';
import {HabitPerformanceData} from './HabitPerformanceData';

export class HabitData {
    range: DateRange;
    @observable
    performances: HabitPerformanceData[] = [];

    constructor(range: DateRange, performances: HabitPerformanceData[]) {
        this.range = range;
        this.performances = performances;
    }
}
