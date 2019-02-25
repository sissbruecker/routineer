import cn from 'classnames';
import React, {MouseEvent} from 'react';
import text from '../../../util/text.module.css';
import styles from './DropdownMenuItem.module.css';

interface DropdownMenuItemProps {
    itemId?: any;
    className?: string;
    disableHover?: boolean;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export class DropdownMenuItem extends React.Component<DropdownMenuItemProps> {
    render() {

        const itemClasses = cn(
            styles.root,
            text.truncate,
            !this.props.disableHover && styles.withHover,
            this.props.className
        );

        return (
            <li data-item-id={this.props.itemId}
                className={itemClasses}
                onClick={this.props.onClick}>
                {this.props.children}
            </li>
        );
    }
}
