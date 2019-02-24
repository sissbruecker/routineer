import * as React from 'react';
import {HabitPerformance} from '../../model/HabitPerformance';
import {BaseScale} from './BaseScale';
import {Month} from '../../model/Month';
import {Square} from './Square';
import bind from 'bind-decorator';
import {PerformedSquare} from './PerformedSquare';

interface HabitScaleProps {
    performance: HabitPerformance;
}

export class HabitScale extends React.Component<HabitScaleProps> {
    render() {
        return <BaseScale month={this.props.performance.month} squareRenderer={this.renderSquare}/>
    }

    @bind
    renderSquare(month: Month, day: number) {
        const performed = this.props.performance.isPerformed(day);
        return performed
            ? <PerformedSquare color={this.props.performance.habit.color}/>
            : <Square/>;
    }
}
