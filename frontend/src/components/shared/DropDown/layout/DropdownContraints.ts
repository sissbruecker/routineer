import { DropdownLayoutContext } from './DropdownLayout';

export function alignConstraint(context: DropdownLayoutContext) {
    const { element, anchor, options } = context;
    const { align, offset } = options;
    const elementBounds = element.bounds;
    const anchorBounds = anchor.bounds;

    let top: number;
    let left: number;

    if (align.left) left = anchorBounds.right - elementBounds.width + offset.left;
    if (align.right) left = anchorBounds.left + offset.left;
    if (align.top) top = anchorBounds.top - elementBounds.height + offset.top;
    if (align.bottom) top = anchorBounds.bottom + offset.top;

    element.change({ left, top });
}

export function sizeStretch(context: DropdownLayoutContext) {
    const { element, anchor, options } = context;
    const { align, offset } = options;
    const minWidth = anchor.bounds.width - (align.left ? -offset.left : offset.left);

    element.change({ minWidth });
}

export function containShift(context: DropdownLayoutContext) {

    const containerMargin = context.options.containerMargin;
    const element = context.element.bounds;
    const container = context.container.bounds;

    let { top, left } = element;

    if (left > container.width - element.width - containerMargin) {
        left = container.width - element.width - containerMargin;
    }

    if (left < containerMargin) left = containerMargin;

    if (top > container.height - element.height - containerMargin) {
        top = container.height - element.height - containerMargin;
    }

    if (top < containerMargin) top = containerMargin;

    context.element.change({ top, left });
}

export function containShrink(context: DropdownLayoutContext) {
    const anchor = context.anchor.bounds;
    const container = context.container.bounds;
    const align = context.options.align;
    const containerMargin = context.options.containerMargin;
    let maxHeight: number;

    if (align.top) {
        maxHeight = anchor.top - containerMargin;
    }
    if (align.bottom) {
        maxHeight = container.height - anchor.bottom - containerMargin;
    }

    context.element.change({ maxHeight });
}
