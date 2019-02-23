import * as React from 'react';
import styles from './HabitRowHeader.module.css';

export class HabitRowHeader extends React.Component<{}> {
    render() {
        return (
            <div className={styles.root}>
                {this.props.children}
            </div>
        );
    }
}
