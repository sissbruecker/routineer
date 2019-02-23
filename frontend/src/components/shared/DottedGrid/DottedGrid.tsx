import * as React from 'react';
import styles from './DottedGrid.module.css';

export class DottedGrid extends React.Component<{}> {

    render() {
        return (
            <div className={styles.root}>
                {this.props.children}
            </div>
        );
    }
}
