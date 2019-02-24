import * as React from 'react';
import {DateRange} from '../../model/DateRange';
import {Day} from '../../model/Day';
import {DateUtil} from '../../util/DateUtil';
import {BaseScale} from './BaseScale';
import {Square} from './Square';

interface DayNameScaleProps {
    range: DateRange;
}

export class DayNameScale extends React.Component<DayNameScaleProps> {

    render() {
        return <BaseScale range={this.props.range} squareRenderer={this.renderSquare}/>
    }

    renderSquare(day: Day) {
        const label = DateUtil.getShortDayName(day.day);
        return <Square>{label}</Square>;
    }
}
