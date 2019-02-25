import bind from 'bind-decorator';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {MonthRange} from '../../model/DateRange';
import {Day} from '../../model/Day';
import {Habit} from '../../model/Habit';
import {HabitStore} from '../../stores/HabitStore';
import {DottedGrid} from '../shared/DottedGrid/DottedGrid';
import {DateScale} from './DateScale';
import {DayNameScale} from './DayNameScale';
import {EmptyHabitRow} from './EmptyHabitRow';
import {HabitRow} from './HabitRow';
import styles from './HabitTracker.module.css';
import {Row} from './Row';
import {RowHeader} from './RowHeader';

interface HabitTrackerProps {
    habitStore?: HabitStore;
}

@inject('habitStore')
@observer
export class HabitTracker extends React.Component<HabitTrackerProps> {

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
        const { range, data } = this.props.habitStore;

        if (!data) return null;

        const habitRows = data.performances.map(performance =>
            <HabitRow key={performance.habit.id}
                      performance={performance}
                      onChangeHabit={this.handleHabitChange}
                      onDeleteHabit={this.handleDeleteHabit}
                      onSetPerformed={this.handleSetPerformed}/>
        );

        return (
            <div className={styles.root}>
                <h1>Habit Tracker</h1>
                <DottedGrid>
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
                </DottedGrid>
            </div>
        );
    }
}
