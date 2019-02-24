import React, {Component} from 'react';
import './App.css';
import {HabitTracker} from './components/HabitTracker/HabitTracker';
import {HabitData} from './model/HabitData';
import {Month} from './model/Month';
import {Habit} from './model/Habit';
import {HabitPerformance} from './model/HabitPerformance';

class App extends Component {

    setupData() {

        const month = Month.current();
        const habitData = new HabitData();
        habitData.month = month;

        const habit1 = new Habit();
        habit1.name = 'Morning meditation';
        const habit2 = new Habit();
        habit2.name = 'Morning yoga';
        habit2.color = 'aquamarine';
        const habit3 = new Habit();
        habit3.name = 'Morning reflection';
        habit3.color = 'fuchsia';

        const performance1 = new HabitPerformance(habit1, month);
        const performance2 = new HabitPerformance(habit2, month);
        const performance3 = new HabitPerformance(habit3, month);

        habitData.performances.push(performance1);
        habitData.performances.push(performance2);
        habitData.performances.push(performance3);

        performance1.setPerformed(0, true);
        performance1.setPerformed(5, true);
        performance1.setPerformed(18, true);
        performance1.setPerformed(21, true);

        performance2.setPerformed(3, true);
        performance2.setPerformed(7, true);
        performance2.setPerformed(8, true);
        performance2.setPerformed(15, true);

        performance3.setPerformed(4, true);
        performance3.setPerformed(5, true);
        performance3.setPerformed(7, true);
        performance3.setPerformed(8, true);

        return habitData;
    }

    render() {

        const data = this.setupData();

        return (
            <div className="App">
                <HabitTracker habitData={data}/>
            </div>
        );
    }
}

export default App;
