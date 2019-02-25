import bind from 'bind-decorator';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {DropDown, DropDownContent, DropDownTrigger, OpenStateCallback} from '../shared/DropDown/DropDown';
import {DropdownButton} from '../shared/DropDown/DropdownButton';
import {DropdownMenuItem} from '../shared/DropDown/DropdownMenuItem';
import {DropdownMenuList} from '../shared/DropDown/DropdownMenuList';
import {DropdownWindow} from '../shared/DropDown/DropdownWindow';

interface HabitDropdownProps {
    className?: string;
    onOpenStateChange?: OpenStateCallback;
    onDeleteHabit: () => void;
}

@observer
export class HabitDropdown extends React.Component<HabitDropdownProps> {

    @observable
    isOpen: boolean;
    @observable
    dropdown: DropDown;

    @bind
    handleDropdownRef(dropdown: DropDown) {
        this.dropdown = dropdown;
    }

    @bind
    handleOpenStateChange(open: boolean, programmatic: boolean) {
        this.isOpen = open;
        this.props.onOpenStateChange && this.props.onOpenStateChange(open, programmatic);
    }

    @bind
    handleDeleteClick() {
        this.props.onDeleteHabit();
        this.dropdown.close();
    }

    render() {
        return (
            <DropDown className={this.props.className}
                      ref={this.handleDropdownRef}
                      onOpenStateChange={this.handleOpenStateChange}>
                <DropDownTrigger>
                    <DropdownButton active={this.isOpen}>
                        <i className="fas fa-ellipsis-v"/>
                    </DropdownButton>
                </DropDownTrigger>
                <DropDownContent>
                    <DropdownWindow>
                        <DropdownMenuList>
                            <DropdownMenuItem onClick={this.handleDeleteClick}>Delete</DropdownMenuItem>
                        </DropdownMenuList>
                    </DropdownWindow>
                </DropDownContent>
            </DropDown>
        );
    }
}
