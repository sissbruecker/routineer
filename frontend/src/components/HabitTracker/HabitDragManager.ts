import bind from 'bind-decorator';
import {DragEvent} from 'react';
import {findDOMNode} from 'react-dom';
import {HabitPerformanceData} from '../../model/HabitPerformanceData';
import {HabitStore} from '../../stores/HabitStore';
import {HabitRow} from './HabitRow';

const HABIT_FORMAT_TYPE = 'application/x-routineer-habit';

function isHabitDragEvent(event: DragEvent<HTMLElement>) {
    return event.dataTransfer.types.indexOf(HABIT_FORMAT_TYPE) >= 0;
}

export class HabitDragManager {

    private readonly store: HabitStore;

    constructor(store: HabitStore) {
        this.store = store;
    }

    isDragged(performance: HabitPerformanceData) {
        const { movingPerformance } = this.store;
        return movingPerformance
            && movingPerformance.habit.id === performance.habit.id;
    }

    @bind
    dragStart(event: DragEvent<HTMLElement>, component: HabitRow) {
        const { performance } = component.props;

        event.dataTransfer.setData(HABIT_FORMAT_TYPE, performance.habit.id.toString());
        event.dataTransfer.effectAllowed = 'move';

        // Defer setting the moving performance, otherwise the rule would switch to hidden
        // and the drag feedback would be invisible too
        setTimeout(() => {
            this.store.beginMoveHabit(performance);
        });
    }

    @bind
    dragOver(event: DragEvent<HTMLElement>, component: HabitRow) {

        if (!isHabitDragEvent(event)) return;

        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();

        const hoveredHabit = component.props.performance;
        const hoveredIndex = this.store.orderedPerformances.indexOf(hoveredHabit);
        const draggedIndex = this.store.orderedPerformances.indexOf(this.store.movingPerformance);

        // Skip if hovered and dragged rules are the same
        if (hoveredIndex === draggedIndex) return;

        const hoverBoundingRect = (findDOMNode(component) as HTMLElement).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = event.clientY;

        // Get pixels to the top
        const hoverClientY = clientOffset - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (draggedIndex < hoveredIndex && hoverClientY < hoverMiddleY) return;

        // Dragging upwards
        if (draggedIndex > hoveredIndex && hoverClientY > hoverMiddleY) return;

        this.store.moveHabitTo(hoveredIndex);
    }

    @bind
    dragDrop(event: DragEvent<HTMLElement>) {

        if (!isHabitDragEvent(event)) return;

        this.store.commitMoveHabit();
    }

    @bind
    dragEnd(event: DragEvent<HTMLElement>) {
        // Drop was not performed
        if (event.dataTransfer.dropEffect === 'none') {
            this.store.cancelMoveHabit();
        }
    }

}
