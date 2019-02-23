import * as React from 'react';
import styles from './HabitTracker.module.css';
import {DottedGrid} from '../shared/DottedGrid/DottedGrid';
import {DateScale} from './DateScale';
import {DayNameScale} from './DayNameScale';
import {HabitRow} from './HabitRow';
import {HabitRowHeader} from './HabitRowHeader';
import {HabitData} from '../../model/HabitData';
import {HabitPerformance} from '../../model/HabitPerformance';
import {HabitScale} from './HabitScale';

interface HabitTrackerProps {
    habitData: HabitData;
}

export class HabitTracker extends React.Component<HabitTrackerProps> {
    render() {
        const { habitData } = this.props;
        const month = habitData.month;

        const habitRows = habitData.performances
            .map(performance => this.renderHabitRow(performance));

        return (
            <div className={styles.root}>
                <h1>Habit Tracker</h1>
                <DottedGrid>
                    <HabitRow separator>
                        <HabitRowHeader/>
                        <DateScale month={month}/>
                    </HabitRow>
                    <HabitRow>
                        <HabitRowHeader/>
                        <DayNameScale month={month}/>
                    </HabitRow>
                    {habitRows}
                </DottedGrid>
            </div>
        );
    }

    renderHabitRow(performance: HabitPerformance) {
        return (
            <HabitRow>
                <HabitRowHeader>{performance.habit.name}</HabitRowHeader>
                <HabitScale performance={performance}/>
            </HabitRow>
        );
    }
}
