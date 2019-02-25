import {action, observable} from 'mobx';
import {HabitBackend} from '../backend/HabitBackend';
import {DateRange} from '../model/DateRange';
import {Habit} from '../model/Habit';
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

    @action
    async changeHabit(habit: Habit, changes: Partial<Habit>) {
        habit = Object.assign(habit, changes);
        await this.backend.saveHabit(habit);
    }
}
