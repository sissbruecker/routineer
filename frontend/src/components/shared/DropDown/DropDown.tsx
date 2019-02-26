import bind from 'bind-decorator';
import cn from 'classnames';
import {observer} from 'mobx-react';
import React, {cloneElement, ReactElement, ReactNode} from 'react';
import {BasicProps} from '../../../util/BasicProps';
import styles from './DropDown.module.css';
import {DropdownContainmentMode, DropdownLayoutOptions, DropdownSizeMode, layout} from './layout/DropdownLayout';

export interface ElementProvider {
    (): HTMLElement;
}

export interface OpenStateCallback {
    (state: boolean, programmatic: boolean): void;
}

interface DropDownProps extends BasicProps {
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
    offsetTop?: number;
    offsetLeft?: number;
    container?: HTMLElement;
    sizeMode?: DropdownSizeMode;
    containmentMode?: DropdownContainmentMode;
    containerMargin?: number;
    anchorProvider?: ElementProvider;
    onOpenStateChange?: OpenStateCallback;
}

interface DropDownState {
    isOpen: boolean;
}

export class DropDownTrigger extends React.Component<{}> {
    render() {
        return React.Children.only(this.props.children);
    }
}

export class DropDownContent extends React.Component<{}> {
    render() {
        return React.Children.only(this.props.children);
    }
}

@observer
export class DropDown extends React.Component<DropDownProps, DropDownState> {

    private triggerElement: HTMLElement;
    private contentElement: HTMLElement;

    constructor(props: DropDownProps, context: any) {
        super(props, context);

        this.state = {
            isOpen: false
        };
    }

    open(programmatic: boolean = true) {
        if (this.state.isOpen) return;

        this.setState({
            isOpen: true
        });

        this.props.onOpenStateChange && this.props.onOpenStateChange(true, programmatic);
    }

    close(programmatic: boolean = true) {
        if (!this.state.isOpen) return;

        this.setState({
            isOpen: false
        });

        this.props.onOpenStateChange && this.props.onOpenStateChange(false, programmatic);
    }

    toggle(programmatic: boolean = true) {
        if (this.state.isOpen) {
            this.close(programmatic);
        } else {
            this.open(programmatic);
        }
    }

    @bind
    private handleToggle() {
        this.toggle(false);
    }

    @bind
    private handleTriggerRef(element: HTMLElement) {
        this.triggerElement = element;
    }

    @bind
    private handleContentRef(element: HTMLElement) {

        const updated = this.contentElement !== element;

        if (this.contentElement && updated) {
            this.removeListeners();
        }

        this.contentElement = element;

        if (this.contentElement && updated) {
            this.addListeners();
        }
    }

    @bind
    private handleDocumentMouseDown(event: MouseEvent) {
        // Cancel if click was within dropdown
        if (this.contentElement === event.target) return false;
        if (this.contentElement.contains(event.target as HTMLElement)) return false;
        if (this.triggerElement === event.target) return false;
        if (this.triggerElement.contains(event.target as HTMLElement)) return false;

        this.close(false);

        return true;
    }

    @bind
    private handleDocumentKeyDown(event: KeyboardEvent) {
        if (event.keyCode === 27) {
            this.close(false);
        }
    }

    layout() {
        if (!this.contentElement) return;

        const options = createLayoutOptions(this.props, this.triggerElement, this.contentElement);

        layout(options);
    }

    private addListeners() {
        document.addEventListener('mousedown', this.handleDocumentMouseDown);
        document.addEventListener('keydown', this.handleDocumentKeyDown);
    }

    private removeListeners() {
        document.removeEventListener('mousedown', this.handleDocumentMouseDown);
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    componentDidUpdate(prevProps: Readonly<DropDownProps>, prevState: Readonly<DropDownState>, prevContext: any): void {
        if (!prevState.isOpen && this.state.isOpen) {
            this.layout();
        }
    }

    render() {

        const { children } = this.props;
        const { isOpen } = this.state;
        let trigger = getDropdownPart(children, DropDownTrigger);
        let content = getDropdownPart(children, DropDownContent);
        const dropdownClasses = cn(
            styles.root,
            this.props.className
        );

        if (!trigger || !content) {
            console.warn('DropDown trigger or content is not defined.');
            return null;
        }

        trigger = cloneElement(trigger, {
            forwardRef: this.handleTriggerRef,
            onClick: this.handleToggle
        });

        content = cloneElement(content, {
            forwardRef: this.handleContentRef
        });

        return (
            <div className={dropdownClasses}>
                {trigger}
                {isOpen && content}
            </div>
        );
    }
}

function createLayoutOptions(props: DropDownProps,
                             trigger: HTMLElement,
                             element: HTMLElement): DropdownLayoutOptions {

    const container = props.container || document.body;
    const anchor = (props.anchorProvider && props.anchorProvider()) || trigger;

    // Align
    const align = {
        top: props.top,
        bottom: props.bottom,
        left: props.left,
        right: props.right
    };

    if (!align.top && !align.bottom) align.bottom = true;
    if (!align.left && !align.right) align.right = true;

    // Offset
    const offset = {
        top: props.offsetTop || 0,
        left: props.offsetLeft || 0,
    };

    const sizeMode = props.sizeMode || DropdownSizeMode.stretch;
    const containmentMode = props.containmentMode || DropdownContainmentMode.shift;

    // Other
    const containerMargin = props.containerMargin || 10;

    return {
        anchor,
        element,
        container,
        align,
        offset,
        sizeMode,
        containmentMode,
        containerMargin
    };
}

function getDropdownPart(children: ReactNode, type: any): ReactElement<any> {
    let result = null;
    React.Children.forEach(children, (child) => {
        if ((child as any).type === type)
            result = child;
    });

    return result
        ? React.Children.only((result as ReactElement<any>).props.children)
        : null;
}

function getBaseRef(ref: any): HTMLElement {
    return ref instanceof HTMLElement
        ? ref
        : ref.base;
}
