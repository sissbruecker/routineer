import bind from 'bind-decorator';
import cn from 'classnames';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {DragEvent, MouseEvent} from 'react';
import {DateRange} from '../../model/DateRange';
import {Day} from '../../model/Day';
import {Habit} from '../../model/Habit';
import {HabitPerformanceData} from '../../model/HabitPerformanceData';
import {ButtonSquare} from './scales/ButtonSquare';
import {HabitDropdown} from './dropdown/HabitDropdown';
import {HabitDragManager} from './HabitDragManager';
import {HabitNameInput} from './HabitNameInput';
import styles from './HabitRow.module.css';
import {Row} from './Row';
import {RowHeader} from './RowHeader';
import {HabitScale} from './scales/HabitScale';

interface HabitRowProps {
    range: DateRange;
    performance: HabitPerformanceData;
    draggable: boolean;
    dragManager: HabitDragManager;

    onChangeHabit(habit: Habit, changes: Partial<Habit>): Promise<any>;

    onDeleteHabit(habit: Habit);

    onSetPerformed(habit: Habit, day: Day, performed: boolean);
}

@observer
export class HabitRow extends React.Component<HabitRowProps> {

    dragHandleRef: Element;
    dragTarget: Element;

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

    @bind
    handleMouseDown(event: MouseEvent<HTMLElement>) {
        this.dragTarget = event.target as Element;
    }

    @bind
    handleDragHandleElement(element: HTMLElement) {
        this.dragHandleRef = element;
    }

    @bind
    handleDragStart(event: DragEvent<HTMLElement>) {
        if (this.props.draggable && (
            this.dragHandleRef === this.dragTarget ||
            this.dragHandleRef.contains(this.dragTarget)
        )) {
            this.props.dragManager.dragStart(event, this);
        } else {
            event.preventDefault();
        }
    }

    @bind
    handleDragOver(event: DragEvent<HTMLElement>) {
        this.props.dragManager.dragOver(event, this);
    }

    @bind
    handleDragDrop(event: DragEvent<HTMLElement>) {
        this.props.dragManager.dragDrop(event);
    }

    @bind
    handleDragEnd(event: DragEvent<HTMLElement>) {
        this.props.dragManager.dragEnd(event);
    }

    render() {
        const { range, performance } = this.props;
        const menuClasses = cn(
            styles.menu,
            this.isMenuOpen && styles.open
        );
        const draggableClasses = cn(
            styles.draggable,
            !this.props.draggable && styles.disabled
        );

        return (
            <Row className={styles.root}
                 draggable={this.props.draggable}
                 onMouseDown={this.handleMouseDown}
                 onDragStart={this.handleDragStart}
                 onDragOver={this.handleDragOver}
                 onDrop={this.handleDragDrop}
                 onDragEnd={this.handleDragEnd}>
                <RowHeader className={styles.header}>
                    <HabitNameInput name={performance.habit.name}
                                    onChange={this.handleNameChange}/>
                    <ButtonSquare forwardRef={this.handleDragHandleElement}
                                  className={draggableClasses}>
                        <i className="fas fa-sort"/>
                    </ButtonSquare>
                    <div
                         >
                    </div>
                    <HabitDropdown habit={performance.habit}
                                   className={menuClasses}
                                   onOpenStateChange={this.handleOpenStateChange}
                                   onDeleteHabit={this.props.onDeleteHabit}
                                   onChangeHabit={this.props.onChangeHabit}/>
                </RowHeader>
                <HabitScale range={range} performance={performance}
                            onSetPerformed={this.props.onSetPerformed}/>
            </Row>
        );
    }
}
