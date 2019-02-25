import bind from 'bind-decorator';
import * as React from 'react';
import {Day} from '../../model/Day';
import {HabitPerformanceData} from '../../model/HabitPerformanceData';
import {BaseScale} from './BaseScale';
import {PerformedSquare} from './PerformedSquare';
import {Square} from './Square';

interface HabitScaleProps {
    performance: HabitPerformanceData;
}

export class HabitScale extends React.Component<HabitScaleProps> {
    render() {
        return <BaseScale range={this.props.performance.range} squareRenderer={this.renderSquare}/>
    }

    @bind
    renderSquare(day: Day) {
        const performed = this.props.performance.isPerformed(day);
        return performed
            ? <PerformedSquare key={day.key} color={this.props.performance.habit.color}/>
            : <Square key={day.key}/>;
    }
}
