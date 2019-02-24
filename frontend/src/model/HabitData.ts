import {HabitPerformance} from './HabitPerformance';
import {DateRange} from './DateRange';

export class HabitData {
    range: DateRange;
    performances: HabitPerformance[] = [];
}
