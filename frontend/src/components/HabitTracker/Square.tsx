import cn from 'classnames';
import * as React from 'react';
import styles from './Square.module.css';

interface SquareProps {
    className?: string;
    style?: any;
}

export class Square extends React.Component<SquareProps> {
    render() {

        const classes = cn(
            styles.root,
            this.props.className
        );

        return (
            <div className={classes}
                 style={this.props.style}>{this.props.children}</div>
        );
    }
}
