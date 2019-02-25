import {action, observable} from 'mobx';
import {HabitBackend} from '../backend/HabitBackend';
import {DateRange} from '../model/DateRange';
import {HabitData} from '../model/HabitData';

export class HabitStore {

    backend: HabitBackend;

    @observable
    range: DateRange;
    @observable
    data: HabitData;

    @action
    async setRange(range: DateRange) {
        this.range = range;

        this.data = await this.backend.getHabitData(range);
    }
}
