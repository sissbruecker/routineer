import * as React from 'react';
import {BaseScale} from './BaseScale';
import {Month} from '../../model/Month';
import {Square} from './Square';

interface DateScaleProps {
    month: Month;
}

export class DateScale extends React.Component<DateScaleProps> {

    render() {
        return <BaseScale month={this.props.month}
                          squareRenderer={this.renderSquare}/>
    }

    renderSquare(month: Month, day: number) {
        return <Square>{day + 1}</Square>
    }
}
