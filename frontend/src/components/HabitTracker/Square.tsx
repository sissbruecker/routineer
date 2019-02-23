import * as React from 'react';
import styles from './Square.module.css';

export class Square extends React.Component<{}> {
    render() {
        return (
            <div className={styles.root}>{this.props.children}</div>
        );
    }
}
