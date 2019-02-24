import {Day} from './Day';
import {Habit} from './Habit';

export class HabitPerformed {
    id: string;
    habitId: string;
    dateKey: number;

    constructor(habit: Habit, day: Day) {
        this.habitId = habit.id;
        this.dateKey = day.key;
        this.id = `${this.habitId}_${this.dateKey}`;
    }
}
