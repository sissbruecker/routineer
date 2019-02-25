import cn from 'classnames';
import * as React from 'react';
import styles from './Row.module.css';

interface HabitRowProps {
    separator?: boolean;
}

export class Row extends React.Component<HabitRowProps> {
    render() {

        const classes = cn(
            styles.root,
            this.props.separator && styles.separator
        );

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}
