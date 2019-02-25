import React, {Component} from 'react';
import './App.css';
import {HabitTracker} from './components/HabitTracker/HabitTracker';

class App extends Component<{}> {

    render() {
        return (
            <div className="App">
                <HabitTracker/>
            </div>
        );
    }
}

export default App;
