import React from 'react';
import styles from './DropdownMenuSeparator.module.css';

export class DropdownMenuSeparator extends React.Component<{}> {
    render() {
        return (
            <li className={styles.root}>
                <div className={styles.line}/>
            </li>
        );
    }
}
