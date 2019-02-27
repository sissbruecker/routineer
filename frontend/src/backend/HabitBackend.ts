import {DateRange} from '../model/DateRange';
import {Day} from '../model/Day';
import {Habit} from '../model/Habit';
import {HabitData} from '../model/HabitData';

export interface HabitBackend {

    getHabits(): Promise<Habit[]>;

    saveHabit(habit: Habit): Promise<Habit>;

    moveHabit(habit: Habit, newIndex: number): Promise<any>;

    removeHabit(habit: Habit): Promise<any>;

    getHabitData(range: DateRange): Promise<HabitData>;

    setPerformed(habit: Habit, day: Day, performed: boolean): Promise<any>;
}

