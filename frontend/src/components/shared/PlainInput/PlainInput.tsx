import cn from 'classnames';
import * as React from 'react';
import styles from './PlainInput.module.css';

interface PlainInputProps extends React.HTMLProps<HTMLInputElement> {
}

export class PlainInput extends React.Component<PlainInputProps> {

    render() {

        const classes = cn(
            styles.root,
            this.props.className
        );

        return (
            <input {...this.props} className={classes}/>
        );
    }
}
