import bind from 'bind-decorator';
import cn from 'classnames';
import {observer} from 'mobx-react';
import React, {MouseEvent} from 'react';
import {ColorPalette} from '../../../model/ColorPalette';
import styles from './HabitColorPicker.module.css';

interface HabitColorPickerProps {
    selectedColor: string;

    onChange(color: string)
}

@observer
export class HabitColorPicker extends React.Component<HabitColorPickerProps> {

    @bind
    handleSelect(e: MouseEvent<HTMLElement>) {
        const color = (e.target as HTMLElement).dataset.color;
        this.props.onChange(color);
    }

    render() {
        const { selectedColor } = this.props;

        const colorItems = ColorPalette.all().map(color =>
            this.renderColor(color, color === selectedColor)
        );

        return (
            <ul className={styles.root}>
                {colorItems}
            </ul>
        );
    }

    renderColor(color: string, selected: boolean) {

        const classes = cn(
            styles.color,
            selected && styles.selected
        );
        const inline = {
            background: color
        };

        return (
            <li key={color}
                className={classes}
                style={inline}
                data-color={color}
                onClick={this.handleSelect}/>
        )
    }
}
