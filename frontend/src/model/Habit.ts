import {observable} from 'mobx';

export class Habit {
    id: string;
    @observable
    name: string;
    @observable
    color: string;

    static from(values: any) {
        return Object.assign(new Habit(), values);
    }
}
