import bind from 'bind-decorator';
import React from 'react';
import {Habit} from '../../model/Habit';
import {HabitNameInput} from './HabitNameInput';
import {Row} from './Row';
import {RowHeader} from './RowHeader';

interface EmptyHabitRowProps {
    onCreateHabit(props: Partial<Habit>): Promise<any>;
}

export class EmptyHabitRow extends React.Component<EmptyHabitRowProps> {

    @bind
    handleNameChange(name: string) {
        const props = { name };
        return this.props.onCreateHabit(props);
    }

    render() {
        return (
            <Row>
                <RowHeader>
                    <HabitNameInput name={''}
                                    placeholder={'Add new routine...'}
                                    onChange={this.handleNameChange}/>
                </RowHeader>
            </Row>
        );
    }
}
