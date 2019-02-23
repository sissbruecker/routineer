import * as React from 'react';
import styles from './BaseScale.module.css';
import {Month} from '../../model/Month';

interface SquareRenderer {
    (month: Month, day: number): JSX.Element;
}

export interface HabitScaleProps {
    month: Month;
    squareRenderer: SquareRenderer;
}

export class BaseScale extends React.Component<HabitScaleProps> {
    render() {

        const { month, squareRenderer } = this.props;
        const squares = [];

        for (let day = 0; day < month.numberOfDays; day++) {
            const square = squareRenderer(month, day);
            squares.push(square);
        }

        return (
            <div className={styles.root}>{squares}</div>
        );
    }
}
