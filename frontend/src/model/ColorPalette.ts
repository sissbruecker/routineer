const PASTEL_RAINBOW = [
    '#9977b4',
    '#dd86b9',
    '#f497aa',
    '#f9b48a',
    '#fdcd79',
    '#fff68f',
    '#b6d884',
    '#83ccb5',
    '#6bcade',
    '#71abdd',
];

const PASTEL_SUMMER = [
    '#ada7fc',
    '#d187ef',
    '#fda6f8',
    '#ec6f86',
    '#fe816d',
    '#ffba6d',
    '#ffdd75',
    '#daff74',
    '#b2f068',
    '#9ff3c3',
    '#6aecf4',
    '#45b4e7',
];

const WP = [
    '#a4c400',
    '#60a917',
    '#008a00',
    '#00aba9',
    '#1ba1e2',
    '#0150ef',
    '#6a02ff',
    '#aa01ff',
    '#f471d0',
    '#d80073',
    '#a20026',
    '#e51401',
    '#fa6800',
    '#f0a30b',
    '#e3c802',
    '#825a2c',
    '#6d8764',
    '#647687',
    '#76608a',
    '#87784f',
];

const DEFAULT = PASTEL_SUMMER;

const PALETTES = {
    'rainbow': PASTEL_RAINBOW
};

export type PaletteType = 'rainbox';

function getPalette(palette: PaletteType) {
    return PALETTES[palette] || DEFAULT;
}

export class ColorPalette {
    static first(type: PaletteType = null) {
        const palette = getPalette(type);
        return palette[0];
    }

    static random(type: PaletteType = null) {
        const palette = getPalette(type);
        return palette[Math.floor(Math.random() * palette.length)]
    }

    static all(type: PaletteType = null) {
        return getPalette(type);
    }
}
