import bind from 'bind-decorator';
import { action, observable } from 'mobx';
import { KeyboardEvent } from 'react';

interface IndexSelectionCallback {
    (index: number): void;
}

export class DropdownKeyboardNavigation {

    private _items: any[];

    @observable
    selectedIndex: number;

    private onSelect: IndexSelectionCallback;

    get items(): any[] {
        return this._items;
    }

    set items(value: any[]) {
        this._items = value;
        this.sanitizeSelection();
    }

    get numItems() {
        return this._items
            ? this._items.length
            : 0;
    }

    constructor(onSelect: IndexSelectionCallback) {
        this.onSelect = onSelect;
    }

    @bind
    handleKeyboardEvent(event: KeyboardEvent<HTMLElement>): boolean {

        const { keyCode } = event;

        // Up
        if (keyCode === 38) {
            this.navigate(-1);
            return true;
        }

        // Down
        if (keyCode === 40) {
            this.navigate(1);
            return true;
        }

        // Enter
        if (keyCode === 13) {
            if (this.onSelect && this.selectedIndex != null) {
                this.onSelect(this.selectedIndex);
                this.selectedIndex = null;
                return true;
            }
        }

        return false;
    }

    @action
    navigate(direction: number) {
        if (this.selectedIndex == null) {
            this.selectedIndex = 0;
        } else {
            this.selectedIndex += direction;
        }
        this.sanitizeSelection();
    }

    @action
    reset() {
        this.selectedIndex = null;
    }

    @action
    private sanitizeSelection() {
        if (this.selectedIndex == null) return;
        if (this.numItems === 0) {
            this.selectedIndex = null;
            return;
        }

        let newIndex = this.selectedIndex;

        newIndex = Math.min(this.numItems - 1, newIndex);
        newIndex = Math.max(0, newIndex);

        this.selectedIndex = newIndex;
    }
}
