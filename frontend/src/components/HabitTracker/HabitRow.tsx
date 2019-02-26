import bind from 'bind-decorator';
import cn from 'classnames';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {Day} from '../../model/Day';
import {Habit} from '../../model/Habit';
import {HabitPerformanceData} from '../../model/HabitPerformanceData';
import {HabitDropdown} from './dropdown/HabitDropdown';
import {HabitNameInput} from './HabitNameInput';
import styles from './HabitRow.module.css';
import {Row} from './Row';
import {RowHeader} from './RowHeader';
import {HabitScale} from './scales/HabitScale';

interface HabitRowProps {
    performance: HabitPerformanceData;

    onChangeHabit(habit: Habit, changes: Partial<Habit>): Promise<any>;

    onDeleteHabit(habit: Habit);

    onSetPerformed(habit: Habit, day: Day, performed: boolean);
}

@observer
export class HabitRow extends React.Component<HabitRowProps> {

    @observable
    isMenuOpen: boolean;

    @bind
    handleNameChange(name: string) {
        return this.props.onChangeHabit(this.props.performance.habit, { name });
    }

    @bind
    handleOpenStateChange(open: boolean) {
        this.isMenuOpen = open;
    }

    render() {
        const { performance } = this.props;
        const menuClasses = cn(
            styles.menu,
            this.isMenuOpen && styles.open
        );

        return (
            <Row className={styles.root}>
                <RowHeader className={styles.header}>
                    <HabitNameInput name={performance.habit.name}
                                    onChange={this.handleNameChange}/>
                    <HabitDropdown habit={performance.habit}
                                   className={menuClasses}
                                   onOpenStateChange={this.handleOpenStateChange}
                                   onDeleteHabit={this.props.onDeleteHabit}
                                   onChangeHabit={this.props.onChangeHabit}/>
                </RowHeader>
                <HabitScale performance={performance}
                            onSetPerformed={this.props.onSetPerformed}/>
            </Row>
        );
    }
}
