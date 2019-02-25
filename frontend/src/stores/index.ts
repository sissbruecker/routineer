import {LocalHabitBackend} from '../backend/LocalHabitBackend';
import {HabitStore} from './HabitStore';

const habitStore = new HabitStore();
habitStore.backend = new LocalHabitBackend();

const stores = {
    habitStore
};

export default stores;