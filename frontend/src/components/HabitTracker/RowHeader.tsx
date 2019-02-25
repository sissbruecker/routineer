import cn from 'classnames';
import React from 'react';
import styles from './RowHeader.module.css';

interface RowHeaderProps {
    className?: string;
}

export class RowHeader extends React.Component<RowHeaderProps> {
    render() {
        const classes = cn(styles.root, this.props.className);
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}
