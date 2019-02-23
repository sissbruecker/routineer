import * as React from 'react';
import {BaseScale} from './BaseScale';
import {Month} from '../../model/Month';
import {DateUtil} from '../../util/DateUtil';
import {Square} from './Square';

interface DayNameScaleProps {
    month: Month;
}

export class DayNameScale extends React.Component<DayNameScaleProps> {

    render() {
        return <BaseScale month={this.props.month} squareRenderer={this.renderSquare}/>
    }

    renderSquare(month: Month, day: number) {
        const label = DateUtil.getShortDayName(month.getDateByDay(day));
        return <Square>{label}</Square>;
    }
}
