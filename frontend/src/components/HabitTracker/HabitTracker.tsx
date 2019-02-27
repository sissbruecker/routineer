import bind from 'bind-decorator';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {MonthRange} from '../../model/DateRange';
import {Day} from '../../model/Day';
import {Habit} from '../../model/Habit';
import {HabitStore} from '../../stores/HabitStore';
import {EmptyHabitRow} from './EmptyHabitRow';
import {HabitDragManager} from './HabitDragManager';
import {HabitRow} from './HabitRow';
import styles from './HabitTracker.module.css';
import {Row} from './Row';
import {RowHeader} from './RowHeader';
import {DateScale} from './scales/DateScale';
import {DayNameScale} from './scales/DayNameScale';

interface HabitTrackerProps {
    habitStore?: HabitStore;
}

@inject('habitStore')
@observer
export class HabitTracker extends React.Component<HabitTrackerProps> {

    dragManager: HabitDragManager;

    constructor(props: HabitTrackerProps, context: any) {
        super(props, context);
        this.dragManager = new HabitDragManager(props.habitStore);
    }

    componentDidMount(): void {
        this.props.habitStore.setRange(MonthRange.current());
    }

    @bind
    handleCreateHabit(props: Partial<Habit>) {
        return this.props.habitStore.createHabit(props);
    }

    @bind
    handleHabitChange(habit: Habit, changes: Partial<Habit>) {
        return this.props.habitStore.changeHabit(habit, changes);
    }

    @bind
    handleDeleteHabit(habit: Habit) {
        return this.props.habitStore.removeHabit(habit);
    }

    @bind
    handleSetPerformed(habit: Habit, day: Day, performed: boolean) {
        return this.props.habitStore.setHabitPerformed(habit, day, performed);
    }

    render() {
        const { range, orderedPerformances } = this.props.habitStore;

        if (!range) return null;

        const habitRows = orderedPerformances.map(performance =>
            <HabitRow key={performance.habit.id}
                      range={range}
                      performance={performance}
                      draggable={true}
                      dragManager={this.dragManager}
                      onChangeHabit={this.handleHabitChange}
                      onDeleteHabit={this.handleDeleteHabit}
                      onSetPerformed={this.handleSetPerformed}/>
        );

        return (
            <div className={styles.root}>
                <Row separator>
                    <RowHeader/>
                    <DateScale range={range}/>
                </Row>
                <Row>
                    <RowHeader/>
                    <DayNameScale range={range}/>
                </Row>
                {habitRows}
                <EmptyHabitRow onCreateHabit={this.handleCreateHabit}/>
            </div>
        );
    }
}
