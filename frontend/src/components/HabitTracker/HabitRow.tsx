import bind from 'bind-decorator';
import React from 'react';
import {Habit} from '../../model/Habit';
import {HabitPerformanceData} from '../../model/HabitPerformanceData';
import {HabitNameInput} from './HabitNameInput';
import {HabitScale} from './HabitScale';
import {Row} from './Row';
import {RowHeader} from './RowHeader';

interface HabitRowProps {
    performance: HabitPerformanceData;
    onChangeHabit: (habit: Habit, changes: Partial<Habit>) => void;
}

export class HabitRow extends React.Component<HabitRowProps> {

    @bind
    handleNameChange(name: string) {
        this.props.onChangeHabit(this.props.performance.habit, { name });
    }

    render() {
        const { performance } = this.props;

        return (
            <Row>
                <RowHeader>
                    <HabitNameInput name={performance.habit.name} onChange={this.handleNameChange}/>
                </RowHeader>
                <HabitScale performance={performance}/>
            </Row>
        );
    }
}
