import * as React from 'react';
import styles from './PerformedSquare.module.css';
import {Square} from './Square';

interface PerformedSquareProps {
    color: string;
}

export class PerformedSquare extends React.Component<PerformedSquareProps> {
    render() {
        return <Square className={styles.root}
                       style={{ backgroundColor: this.props.color || 'greenyellow' }}/>
    }
}
