import cn from 'classnames';
import React from 'react';
import styles from './PlainButton.module.css';

interface PlainButtonProps extends React.HTMLProps<HTMLButtonElement> {
}

export class PlainButton extends React.Component<PlainButtonProps> {
    render() {
        const classes = cn(styles.root, this.props.className);
        return <button {...this.props} className={classes}>{this.props.children}</button>
    }
}
