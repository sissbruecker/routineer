import bind from 'bind-decorator';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import {Habit} from '../../../model/Habit';
import {BasicProps} from '../../../util/BasicProps';
import {DropDown, DropDownContent, DropDownTrigger, OpenStateCallback} from '../../shared/DropDown/DropDown';
import {ButtonSquare} from '../scales/ButtonSquare';
import {DropdownMenuItem} from '../../shared/DropDown/DropdownMenuItem';
import {DropdownMenuList} from '../../shared/DropDown/DropdownMenuList';
import {DropdownMenuSeparator} from '../../shared/DropDown/DropdownMenuSeparator';
import {DropdownWindow} from '../../shared/DropDown/DropdownWindow';
import {HabitColorPicker} from './HabitColorPicker';

interface HabitDropdownProps extends BasicProps {
    habit: Habit;
    onOpenStateChange?: OpenStateCallback;
    onDeleteHabit: (habit: Habit) => void;
    onChangeHabit: (habit: Habit, changes: Partial<Habit>) => void;
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
        this.props.onDeleteHabit(this.props.habit);
        this.dropdown.close();
    }

    @bind
    handleSelectColor(color: string) {
        this.props.onChangeHabit(this.props.habit, { color });
    }

    render() {
        return (
            <DropDown className={this.props.className}
                      ref={this.handleDropdownRef}
                      onOpenStateChange={this.handleOpenStateChange}>
                <DropDownTrigger>
                    <ButtonSquare active={this.isOpen}>
                        <i className="fas fa-ellipsis-v"/>
                    </ButtonSquare>
                </DropDownTrigger>
                <DropDownContent>
                    <DropdownWindow>
                        <DropdownMenuList>
                            <DropdownMenuItem onClick={this.handleDeleteClick}>Delete</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem disableHover autoSize>
                                <span>Color</span>
                                <HabitColorPicker selectedColor={this.props.habit.color}
                                                  onChange={this.handleSelectColor}/>
                            </DropdownMenuItem>
                        </DropdownMenuList>
                    </DropdownWindow>
                </DropDownContent>
            </DropDown>
        );
    }
}
