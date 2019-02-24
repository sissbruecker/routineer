import React, {Component} from 'react';
import './App.css';
import {HabitTracker} from './components/HabitTracker/HabitTracker';
import {HabitData} from './model/HabitData';
import {Habit} from './model/Habit';
import {HabitPerformance} from './model/HabitPerformance';
import {MonthRange, WeekRange} from './model/DateRange';

class App extends Component {

    setupData() {

        // const range = WeekRange.current();
        const range = MonthRange.current();
        const habitData = new HabitData();
        habitData.range = range;

        const habit1 = new Habit();
        habit1.name = 'Morning meditation';
        const habit2 = new Habit();
        habit2.name = 'Morning yoga';
        habit2.color = 'aquamarine';
        const habit3 = new Habit();
        habit3.name = 'Morning reflection';
        habit3.color = 'fuchsia';

        const performance1 = new HabitPerformance(habit1, range);
        const performance2 = new HabitPerformance(habit2, range);
        const performance3 = new HabitPerformance(habit3, range);

        habitData.performances.push(performance1);
        habitData.performances.push(performance2);
        habitData.performances.push(performance3);

        performance1.setPerformed(range.randomDay(), true);
        performance1.setPerformed(range.randomDay(), true);
        performance1.setPerformed(range.randomDay(), true);
        performance1.setPerformed(range.randomDay(), true);

        performance2.setPerformed(range.randomDay(), true);
        performance2.setPerformed(range.randomDay(), true);
        performance2.setPerformed(range.randomDay(), true);
        performance2.setPerformed(range.randomDay(), true);

        performance3.setPerformed(range.randomDay(), true);
        performance3.setPerformed(range.randomDay(), true);
        performance3.setPerformed(range.randomDay(), true);
        performance3.setPerformed(range.randomDay(), true);

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
