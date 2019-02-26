import cn from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';
import { cloneElement, ReactElement } from 'react';
import {BasicProps} from '../../../util/BasicProps';
import itemStyles from './DropdownMenuItem.module.css';
import styles from './DropdownMenuList.module.css';

interface DropdownMenuListProps extends BasicProps {
    selectedIndex?: number;
    subsequentList?: boolean;
}

@observer
export class DropdownMenuList extends React.Component<DropdownMenuListProps> {

    render() {

        const { selectedIndex, subsequentList } = this.props;
        let { children } = this.props;

        const listClasses = cn(
            styles.root,
            subsequentList && styles.removeTopPadding,
            this.props.className
        );

        // Add selection style to child if there is a selection
        if (selectedIndex != null) {
            children = React.Children.map(children, (child: ReactElement<any>, index) =>
                index === selectedIndex
                    ? cloneElement(child, {
                        className: cn(child.props.className, itemStyles.active)
                    })
                    : child
            );
        }

        return (
            <ul className={listClasses}>
                {children}
            </ul>
        );
    }
}
