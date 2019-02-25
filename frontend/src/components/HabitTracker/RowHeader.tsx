import * as React from 'react';
import styles from './RowHeader.module.css';

export class RowHeader extends React.Component<{}> {
    render() {
        return (
            <div className={styles.root}>
                {this.props.children}
            </div>
        );
    }
}
