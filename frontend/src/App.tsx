import React, {Component} from 'react';
import './App.css';
import {HabitTracker} from './components/HabitTracker/HabitTracker';
import {DummyData} from './DummyData';
import {HabitData} from './model/HabitData';

interface AppState {
    data: HabitData;
}

class App extends Component<{}, AppState> {

    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            data: null
        };

        DummyData.setupFromDb().then(data => {
            this.setState({ data });
        });
    }

    render() {

        const { data } = this.state;

        return (
            <div className="App">
                {
                    data &&
                    <HabitTracker habitData={data}/>
                }
            </div>
        );
    }
}

export default App;
