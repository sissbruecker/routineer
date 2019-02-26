import bind from 'bind-decorator';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {HabitStore} from '../../stores/HabitStore';
import {DottedGrid} from '../shared/DottedGrid/DottedGrid';
import {PlainButton} from '../shared/PlainButton/PlainButton';
import {PrettyHeader} from '../shared/PrettyHeader/PrettyHeader';
import styles from './HabitPage.module.css';
import {HabitTracker} from './HabitTracker';

interface HabitPageProps {
    habitStore?: HabitStore;
}

@inject('habitStore')
@observer
export class HabitPage extends React.Component<HabitPageProps> {

    @bind
    handleMoveNextRange() {
        this.props.habitStore.moveNextRange();
    }

    @bind
    handleMovePreviousRange() {
        this.props.habitStore.movePreviousRange();
    }

    render() {

        const { range } = this.props.habitStore;
        const headerLabel = range
            ? range.label
            : '';

        return (
            <DottedGrid className={styles.root}>
                <PrettyHeader>
                    <PlainButton className={styles.headerButton}
                                 onClick={this.handleMovePreviousRange}>&lt;</PlainButton>
                    {headerLabel}
                    <PlainButton className={styles.headerButton}
                                 onClick={this.handleMoveNextRange}>&gt;</PlainButton>
                </PrettyHeader>
                <HabitTracker/>
            </DottedGrid>
        );
    }
}
