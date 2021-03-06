import cn from 'classnames';
import React from 'react';
import {BasicProps} from '../../../util/BasicProps';
import styles from './DottedGrid.module.css';

export class DottedGrid extends React.Component<BasicProps> {

    render() {

        const classes = cn(styles.root, this.props.className);

        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
}
