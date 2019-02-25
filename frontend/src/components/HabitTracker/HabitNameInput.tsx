import bind from 'bind-decorator';
import {computed, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {ChangeEvent, KeyboardEvent} from 'react';
import {PlainInput} from '../shared/PlainInput/PlainInput';

interface HabitNameInputProps {
    name: string;
    placeholder?: string;
    onChange: (name: string) => Promise<any>;
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
    async handleNameCommit() {
        if (this.draftName == null || this.draftName.trim().length == 0) {
            this.draftName = null;
            return;
        }

        await this.props.onChange(this.draftName);
        this.draftName = null;
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
                        placeholder={this.props.placeholder}
                        onChange={this.handleNameChange}
                        onBlur={this.handleNameCommit}
                        onKeyDown={this.handleEnter}/>
        );
    }
}
