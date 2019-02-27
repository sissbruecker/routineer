import cn from 'classnames';
import * as React from 'react';
import {BasicProps} from '../../util/BasicProps';
import styles from './Row.module.css';

interface RowProps extends BasicProps, React.HTMLProps<HTMLDivElement> {
    separator?: boolean;
}

export class Row extends React.Component<RowProps> {
    render() {

        const classes = cn(
            styles.root,
            this.props.separator && styles.separator,
            this.props.className
        );

        const forwardProps = { ...this.props };
        delete forwardProps['separator'];

        return (
            <div {...forwardProps} className={classes}>
                {this.props.children}
            </div>
        );
    }
}
