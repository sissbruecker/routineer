import * as React from 'react';
import {Square} from './Square';
import styles from './PerformedSquare.module.css';

interface PerformedSquareProps {
    color: string;
}

export class PerformedSquare extends React.Component<PerformedSquareProps> {
    render() {
        return <Square className={styles.root}
                       style={{ backgroundColor: this.props.color || 'greenyellow' }}/>
    }
}
