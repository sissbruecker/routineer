import bind from 'bind-decorator';
import cn from 'classnames';
import {observer} from 'mobx-react';
import * as React from 'react';
import {Day} from '../../model/Day';
import styles from './PerformedSquare.module.css';
import {Square} from './Square';

interface PerformedSquareProps {
    day: Day;
    performed: boolean;
    color: string;

    onSetPerformed(day: Day, performed: boolean);
}

@observer
export class PerformedSquare extends React.Component<PerformedSquareProps> {

    @bind
    handleClick() {
        this.props.onSetPerformed(this.props.day, !this.props.performed);
    }

    render() {

        const classes = cn(
            styles.root,
            this.props.performed && styles.performed
        );
        const inlineStyles = { backgroundColor: this.props.color || 'greenyellow' };

        return <Square className={classes}
                       style={inlineStyles}
                       onClick={this.handleClick}/>
    }
}
