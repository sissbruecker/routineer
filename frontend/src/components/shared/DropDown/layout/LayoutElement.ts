interface LayoutProps {
    top?: number;
    left?: number;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    height?: number;
    minHeight?: number;
    maxHeight?: number;
}

interface LayoutBounds {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
    height: number;
}

const POSITION_PROPS = ['left', 'top'];
const SIZE_PROPS = ['width', 'minWidth', 'maxWidth', 'height', 'minHeight', 'maxHeight'];

function isSizeProp(prop: string) {
    return SIZE_PROPS.indexOf(prop) >= 0;
}

function hasSizeProp(props: LayoutProps) {
    return Object.keys(props).find(isSizeProp);
}

export class LayoutElement {

    private _element: HTMLElement;
    private _bounds: LayoutBounds;
    private _initial: ClientRect;
    private _changes: LayoutProps = {};

    constructor(element: HTMLElement) {
        this._element = element;
        this.measure(true);
    }

    get element() {
        return this._element;
    }

    get bounds() {
        return this._bounds;
    }

    change(props: LayoutProps) {
        Object.assign(this._changes, props);

        if (props.left) {
            const delta = props.left - this._bounds.left;
            this._bounds.left += delta;
            this._bounds.right += delta;
        }

        if (props.top) {
            const delta = props.top - this._bounds.top;
            this._bounds.top += delta;
            this._bounds.bottom += delta;
        }

        // Commit size changes immediately
        if (hasSizeProp(this._changes)) {
            this.commit();
        }
    }

    commit() {

        POSITION_PROPS.forEach((prop) => {
            const value = (this._changes as any)[prop];

            if (value === undefined) return;

            const delta = value - (this._initial as any)[prop];

            this.applyStyle(prop, delta);
        });

        SIZE_PROPS.forEach((prop) => {
            const value = (this._changes as any)[prop];

            if (value === undefined) return;

            this.applyStyle(prop, value);
        });

        this.measure();
    }

    private measure(initial: boolean = false) {
        const rect = this._element.getBoundingClientRect();
        if (initial) this._initial = rect;
        this._bounds = {
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            width: rect.width,
            height: rect.height
        };
    }

    private applyStyle(style: string, value: number) {
        if (value === undefined) return;
        (this._element.style as any)[style] = `${value}px`;
    }
}
