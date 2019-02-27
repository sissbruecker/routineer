import {observable} from 'mobx';

export class Habit {
    id: string;
    @observable
    name: string;
    @observable
    color: string;
    @observable
    orderIndex: number = 0;

    static from(values: any): Habit {
        return Object.assign(new Habit(), values);
    }
}
