import * as React from 'react';
import {HabitData} from '../../model/HabitData';
import {HabitPerformanceData} from '../../model/HabitPerformanceData';
import {DottedGrid} from '../shared/DottedGrid/DottedGrid';
import {DateScale} from './DateScale';
import {DayNameScale} from './DayNameScale';
import {HabitRow} from './HabitRow';
import {HabitRowHeader} from './HabitRowHeader';
import {HabitScale} from './HabitScale';
import styles from './HabitTracker.module.css';

interface HabitTrackerProps {
    habitData: HabitData;
}

export class HabitTracker extends React.Component<HabitTrackerProps> {
    render() {
        const { habitData } = this.props;
        const range = habitData.range;

        const habitRows = habitData.performances
            .map(performance => this.renderHabitRow(performance));

        return (
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
        );
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
