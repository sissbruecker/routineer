import * as React from 'react';
import {HabitPerformance} from '../../model/HabitPerformance';
import {BaseScale} from './BaseScale';
import {Square} from './Square';
import bind from 'bind-decorator';
import {PerformedSquare} from './PerformedSquare';
import {Day} from '../../model/Day';

interface HabitScaleProps {
    performance: HabitPerformance;
}

export class HabitScale extends React.Component<HabitScaleProps> {
    render() {
        return <BaseScale range={this.props.performance.range} squareRenderer={this.renderSquare}/>
    }

    @bind
    renderSquare(day: Day) {
        const performed = this.props.performance.isPerformed(day);
        return performed
            ? <PerformedSquare color={this.props.performance.habit.color}/>
            : <Square/>;
    }
}
