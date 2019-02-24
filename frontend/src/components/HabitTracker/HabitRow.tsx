import * as React from 'react';
import cn from 'classnames';
import styles from './HabitRow.module.css';

interface HabitRowProps {
    separator?: boolean;
}

export class HabitRow extends React.Component<HabitRowProps> {
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