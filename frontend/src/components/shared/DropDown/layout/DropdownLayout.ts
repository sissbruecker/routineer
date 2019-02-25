import { alignConstraint, containShift, containShrink, sizeStretch } from './DropdownContraints';
import { LayoutElement } from './LayoutElement';

export interface DropdownAlign {
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
}

export interface DropdownOffset {
    top: number;
    left: number;
}

export enum DropdownSizeMode {
    auto = 'auto',
    stretch = 'stretch'
}

export enum DropdownContainmentMode {
    none = 'none',
    shift = 'shift',
    shrink = 'shrink'
}

export interface DropdownLayoutOptions {
    align: DropdownAlign;
    offset: DropdownOffset;
    sizeMode: DropdownSizeMode;
    containmentMode: DropdownContainmentMode;
    element: HTMLElement;
    anchor: HTMLElement;
    container: HTMLElement;
    containerMargin: number;
}

export interface DropdownLayoutContext {
    element: LayoutElement;
    anchor: LayoutElement;
    container: LayoutElement;
    options: DropdownLayoutOptions;
}

export function layout(options: DropdownLayoutOptions) {

    const { element, sizeMode, containmentMode } = options;

    setLayoutStyles(element);

    const context = createContext(options);

    switch (sizeMode) {
        case DropdownSizeMode.stretch:
            sizeStretch(context);
            break;
    }

    alignConstraint(context);

    switch (containmentMode) {
        case DropdownContainmentMode.shift:
            containShift(context);
            break;
        case DropdownContainmentMode.shrink:
            containShrink(context);
            break;
    }

    context.element.commit();
    setLayoutFinishedStyles(element);
}

function setLayoutStyles(element: HTMLElement) {
    element.style['position'] = 'absolute';
    element.style['left'] = '0px';
    element.style['top'] = '0px';
    element.style['visibility'] = 'hidden';
}

function setLayoutFinishedStyles(element: HTMLElement) {
    element.style['visibility'] = 'visible';
}

function createContext(options: DropdownLayoutOptions): DropdownLayoutContext {
    return {
        options,
        element: new LayoutElement(options.element),
        anchor: new LayoutElement(options.anchor),
        container: new LayoutElement(options.container)
    };
}
