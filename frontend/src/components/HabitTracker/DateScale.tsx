import * as React from 'react';
import {BaseScale} from './BaseScale';
import {Square} from './Square';
import {DateRange} from '../../model/DateRange';
import {Day} from '../../model/Day';

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
