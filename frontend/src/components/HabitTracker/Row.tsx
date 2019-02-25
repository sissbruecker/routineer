import cn from 'classnames';
import * as React from 'react';
import styles from './Row.module.css';

interface RowProps {
    className?: string;
    separator?: boolean;
}

export class Row extends React.Component<RowProps> {
    render() {

        const classes = cn(
            styles.root,
            this.props.separator && styles.separator,
            this.props.className
        );

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}
