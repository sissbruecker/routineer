import React, {Component} from 'react';
import styles from './App.module.css';
import {HabitPage} from './components/HabitTracker/HabitPage';

export class App extends Component<{}> {

    render() {
        return (
            <div className={styles.root}>
                <HabitPage/>
            </div>
        );
    }
}
