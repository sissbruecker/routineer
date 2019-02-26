import bind from 'bind-decorator';
import {observer} from 'mobx-react';
import * as React from 'react';
import {Day} from '../../../model/Day';
import {Habit} from '../../../model/Habit';
import {HabitPerformanceData} from '../../../model/HabitPerformanceData';
import {BaseScale} from './BaseScale';
import {PerformedSquare} from './PerformedSquare';

interface HabitScaleProps {
    performance: HabitPerformanceData;

    onSetPerformed(habit: Habit, day: Day, performed: boolean);
}

@observer
export class HabitScale extends React.Component<HabitScaleProps> {

    @bind
    handleSetPerformed(day: Day, performed: boolean) {
        this.props.onSetPerformed(this.props.performance.habit, day, performed);
    }

    render() {
        return <BaseScale range={this.props.performance.range} squareRenderer={this.renderSquare}/>
    }

    @bind
    renderSquare(day: Day) {
        const performed = this.props.performance.isPerformed(day);
        return <PerformedSquare key={day.key}
                                day={day}
                                performed={performed}
                                color={this.props.performance.habit.color}
                                onSetPerformed={this.handleSetPerformed}/>;
    }
}
