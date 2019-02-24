import * as React from 'react';
import {DateRange} from '../../model/DateRange';
import {Day} from '../../model/Day';
import styles from './BaseScale.module.css';

interface SquareRenderer {
    (day: Day): JSX.Element;
}

export interface HabitScaleProps {
    range: DateRange;
    squareRenderer: SquareRenderer;
}

export class BaseScale extends React.Component<HabitScaleProps> {
    render() {

        const { range, squareRenderer } = this.props;
        const squares = range.days.map(squareRenderer);

        return (
            <div className={styles.root}>{squares}</div>
        );
    }
}
