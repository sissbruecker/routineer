import cn from 'classnames';
import React, {Ref} from 'react';
import {BasicProps} from '../../../util/BasicProps';
import styles from './DropdownWindow.module.css';

interface DropdownWindowProps extends BasicProps {
    forwardRef?: Ref<HTMLDivElement>;
    nose?: boolean;
    noseLeft?: boolean;
    noseRight?: boolean;
}

export class DropdownWindow extends React.Component<DropdownWindowProps> {
    render() {

        const { nose, noseLeft, noseRight } = this.props;

        const windowClasses = cn(
            styles.root,
            nose && styles.nose,
            noseLeft && styles.left,
            noseRight && styles.right
        );

        const containerClasses = cn(
            styles.inner,
            this.props.className
        );

        return (
            <div className={windowClasses} ref={this.props.forwardRef}>
                <div className={containerClasses}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
