import {action, computed, observable} from 'mobx';
import shortid from 'shortid';
import {HabitBackend} from '../backend/HabitBackend';
import {ColorPalette} from '../model/ColorPalette';
import {DateRange} from '../model/DateRange';
import {Day} from '../model/Day';
import {Habit} from '../model/Habit';
import {HabitPerformanceData} from '../model/HabitPerformanceData';

export class HabitStore {

    backend: HabitBackend;

    @observable
    range: DateRange;
    @observable
    performances: HabitPerformanceData[];

    @observable
    movingPerformance: HabitPerformanceData;
    @observable
    originalPerformanceOrder: HabitPerformanceData[];

    @computed
    get orderedPerformances() {
        return this.performances
            ? this.performances.slice()
                .sort((left, right) => left.habit.orderIndex - right.habit.orderIndex)
            : [];
    }

    @action
    async setRange(range: DateRange) {
        this.range = range;

        this.performances = (await this.backend.getHabitData(range)).performances;
    }

    @action
    async moveNextRange() {
        return this.setRange(this.range.next());
    }

    @action
    async movePreviousRange() {
        return this.setRange(this.range.previous());
    }

    @action
    async createHabit(props: Partial<Habit>) {
        const habit = new Habit();
        habit.id = shortid.generate();
        habit.color = ColorPalette.random();
        habit.orderIndex = this.nextHabitOrderIndex();
        Object.assign(habit, props);
        await this.backend.saveHabit(habit);

        // Create performance row
        const performance = new HabitPerformanceData(habit);

        this.performances.push(performance);
    }

    @action
    async changeHabit(habit: Habit, changes: Partial<Habit>) {
        habit = Object.assign(habit, changes);
        await this.backend.saveHabit(habit);
    }

    @action
    beginMoveHabit(performance: HabitPerformanceData) {
        this.originalPerformanceOrder = this.orderedPerformances.map(HabitPerformanceData.from);
        this.movingPerformance = performance;
    }

    @action
    moveHabitTo(newIndex: number) {
        const reorderedPerformances = this.orderedPerformances.slice();
        const previousIndex = reorderedPerformances.indexOf(this.movingPerformance);
        reorderedPerformances.splice(previousIndex, 1);
        reorderedPerformances.splice(newIndex, 0, this.movingPerformance);

        reorderedPerformances.forEach((performance, index) => {
            performance.habit.orderIndex = index;
        });
    }

    @action
    async commitMoveHabit() {
        await this.backend.moveHabit(this.movingPerformance.habit, this.movingPerformance.habit.orderIndex);
        this.movingPerformance = null;
        this.originalPerformanceOrder = null;
    }

    @action
    cancelMoveHabit() {
        this.performances = this.originalPerformanceOrder;
        this.movingPerformance = null;
        this.originalPerformanceOrder = null;
    }

    @action
    async removeHabit(habit: Habit) {
        await this.backend.removeHabit(habit);
        const index = this.performances.findIndex(performance => performance.habit.id === habit.id);
        this.performances.splice(index, 1);
    }

    @action
    async setHabitPerformed(habit: Habit, day: Day, performed: boolean) {

        await this.backend.setPerformed(habit, day, performed);

        const performance = this.getHabitPerformance(habit);

        performance.setPerformed(day, performed);
    }

    private getHabitPerformance(habit: Habit) {
        return this.performances.find(performance => performance.habit.id === habit.id);
    }

    private nextHabitOrderIndex() {
        return this.performances.length;
    }
}
