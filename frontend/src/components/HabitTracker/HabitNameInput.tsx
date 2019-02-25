import bind from 'bind-decorator';
import {computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {ChangeEvent, KeyboardEvent} from 'react';
import {PlainInput} from '../shared/PlainInput/PlainInput';

interface HabitNameInputProps {
    name: string;
    onChange: (name: string) => void;
}

@observer
export class HabitNameInput extends React.Component<HabitNameInputProps> {

    @observable
    draftName: string;

    @computed
    get editedName() {
        return this.draftName != null
            ? this.draftName
            : this.props.name;
    }

    @bind
    handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        this.draftName = e.target.value;
    }

    @bind
    handleNameCommit() {
        if (!this.draftName) {
            this.draftName = null;
        }

        this.props.onChange(this.draftName);
    }

    @bind
    handleEnter(e: KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode == 13) {
            (e.target as HTMLElement).blur();
        }
    }

    render() {
        return (
            <PlainInput value={this.editedName}
                        onChange={this.handleNameChange}
                        onBlur={this.handleNameCommit}
                        onKeyDown={this.handleEnter}/>
        );
    }
}
