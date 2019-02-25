import bind from 'bind-decorator';
import cn from 'classnames';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {Day} from '../../model/Day';
import {Habit} from '../../model/Habit';
import {HabitPerformanceData} from '../../model/HabitPerformanceData';
import {HabitDropdown} from './HabitDropdown';
import {HabitNameInput} from './HabitNameInput';
import styles from './HabitRow.module.css';
import {HabitScale} from './HabitScale';
import {Row} from './Row';
import {RowHeader} from './RowHeader';

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
    handleDelete() {
        return this.props.onDeleteHabit(this.props.performance.habit);
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
                    <HabitDropdown className={menuClasses}
                                   onOpenStateChange={this.handleOpenStateChange}
                                   onDeleteHabit={this.handleDelete}/>
                </RowHeader>
                <HabitScale performance={performance}
                            onSetPerformed={this.props.onSetPerformed}/>
            </Row>
        );
    }
}
