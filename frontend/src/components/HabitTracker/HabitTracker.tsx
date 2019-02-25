import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {MonthRange} from '../../model/DateRange';
import {HabitPerformanceData} from '../../model/HabitPerformanceData';
import {HabitStore} from '../../stores/HabitStore';
import {DottedGrid} from '../shared/DottedGrid/DottedGrid';
import {DateScale} from './DateScale';
import {DayNameScale} from './DayNameScale';
import {HabitRow} from './HabitRow';
import {HabitRowHeader} from './HabitRowHeader';
import {HabitScale} from './HabitScale';
import styles from './HabitTracker.module.css';

interface HabitTrackerProps {
    habitStore?: HabitStore;
}

@inject('habitStore')
@observer
export class HabitTracker extends React.Component<HabitTrackerProps> {

    componentDidMount(): void {
        this.props.habitStore.setRange(MonthRange.current());
    }

    render() {
        const { range, data } = this.props.habitStore;

        const habitRows = data
            ? data.performances.map(performance => this.renderHabitRow(performance))
            : null;

        return data
            ? (
                <div className={styles.root}>
                    <h1>Habit Tracker</h1>
                    <DottedGrid>
                        <HabitRow separator>
                            <HabitRowHeader/>
                            <DateScale range={range}/>
                        </HabitRow>
                        <HabitRow>
                            <HabitRowHeader/>
                            <DayNameScale range={range}/>
                        </HabitRow>
                        {habitRows}
                    </DottedGrid>
                </div>
            )
            : null;
    }

    renderHabitRow(performance: HabitPerformanceData) {
        return (
            <HabitRow>
                <HabitRowHeader>{performance.habit.name}</HabitRowHeader>
                <HabitScale performance={performance}/>
            </HabitRow>
        );
    }
}
