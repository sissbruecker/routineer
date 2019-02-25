import cn from 'classnames';
import * as React from 'react';
import styles from './Square.module.css';

interface SquareProps extends React.HTMLProps<HTMLDivElement> {
}

export class Square extends React.Component<SquareProps> {
    render() {

        const classes = cn(
            styles.root,
            this.props.className
        );

        return (
            <div {...this.props} className={classes}>{this.props.children}</div>
        );
    }
}
