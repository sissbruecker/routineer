import {DateRange} from './DateRange';
import {HabitPerformanceData} from './HabitPerformanceData';

export class HabitData {
    range: DateRange;
    performances: HabitPerformanceData[] = [];

    constructor(range: DateRange, performances: HabitPerformanceData[]) {
        this.range = range;
        this.performances = performances;
    }
}
