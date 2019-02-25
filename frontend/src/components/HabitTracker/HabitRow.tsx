import bind from 'bind-decorator';
import {observer} from 'mobx-react';
import React from 'react';
import {Day} from '../../model/Day';
import {Habit} from '../../model/Habit';
import {HabitPerformanceData} from '../../model/HabitPerformanceData';
import {HabitNameInput} from './HabitNameInput';
import {HabitScale} from './HabitScale';
import {Row} from './Row';
import {RowHeader} from './RowHeader';

interface HabitRowProps {
    performance: HabitPerformanceData;

    onChangeHabit(habit: Habit, changes: Partial<Habit>): Promise<any>;

    onSetPerformed(habit: Habit, day: Day, performed: boolean);
}

@observer
export class HabitRow extends React.Component<HabitRowProps> {

    @bind
    handleNameChange(name: string) {
        return this.props.onChangeHabit(this.props.performance.habit, { name });
    }

    render() {
        const { performance } = this.props;

        return (
            <Row>
                <RowHeader>
                    <HabitNameInput name={performance.habit.name}
                                    onChange={this.handleNameChange}/>
                </RowHeader>
                <HabitScale performance={performance}
                            onSetPerformed={this.props.onSetPerformed}/>
            </Row>
        );
    }
}
