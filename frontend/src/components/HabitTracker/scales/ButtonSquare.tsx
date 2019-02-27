import cn from 'classnames';
import React, {Ref} from 'react';
import styles from './ButtonSquare.module.css';

interface DropdownButtonProps extends React.HTMLProps<HTMLButtonElement> {
    forwardRef?: Ref<HTMLButtonElement>;
    active?: boolean;
}

export class ButtonSquare extends React.Component<DropdownButtonProps> {
    render() {
        const classes = cn(
            styles.root,
            this.props.active && styles.active,
            this.props.className
        );
        let cleanedProps: any = Object.assign({}, this.props);
        delete cleanedProps['forwardRef'];
        delete cleanedProps['active'];
        return (
            <button {...cleanedProps}
                    ref={this.props.forwardRef}
                    className={classes}>{this.props.children}</button>
        );
    }
}
