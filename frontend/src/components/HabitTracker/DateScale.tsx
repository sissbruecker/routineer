import * as React from 'react';
import {DateRange} from '../../model/DateRange';
import {Day} from '../../model/Day';
import {BaseScale} from './BaseScale';
import {Square} from './Square';

interface DateScaleProps {
    range: DateRange;
}

export class DateScale extends React.Component<DateScaleProps> {

    render() {
        return <BaseScale range={this.props.range}
                          squareRenderer={this.renderSquare}/>
    }

    renderSquare(day: Day) {
        return <Square>{day.date}</Square>
    }
}
