import cn from 'classnames';
import React from 'react';
import {BasicProps} from '../../../util/BasicProps';
import styles from './PrettyHeader.module.css';

export class PrettyHeader extends React.Component<BasicProps> {
    render() {
        const classes = cn(styles.root, this.props.className);
        return (
            <div className={classes}>
                <h1>{this.props.children}</h1>
            </div>
        );
    }
}
