import { Preset } from '@app-entities'

export const defaultPresets: Preset[] = [
    {
        name: 'Classic',
        styles: {
            fontFamily: 'sans-serif',
            fontVariant: '400',
            italics: false,
            underline: false,
            fontSize: 16,
            alignment: 'center',
            fill: '#ffffff',
            stroke: {
                color: '#000000',
                width: 5,
            },
            position: {
                horizontal: 'auto',
                vertical: 80,
                useLines: false,
            },
            box: {
                color: '#000000',
                opacity: 0,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            shadow: [
                {
                    color: '#000000',
                    offsetX: 0,
                    offsetY: 0,
                    blur: 13,
                },
            ],
            transition: {
                start: {
                    preset: 'none',
                    duration: 0,
                    easing: 'linear',
                },
                end: {
                    preset: 'none',
                    duration: 0,
                    easing: 'linear',
                },
            },
        },
    },
    {
        name: 'Warm',
        styles: {
            fontFamily: 'sans-serif',
            fontVariant: '700',
            italics: false,
            underline: false,
            fontSize: 16,
            alignment: 'center',
            fill: '#ffd500',
            stroke: {
                color: '#000000',
                width: 0,
            },
            position: {
                horizontal: 'auto',
                vertical: 80,
                useLines: false,
            },
            box: {
                color: '#000000',
                opacity: 0,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            shadow: [
                {
                    color: '#ff5900',
                    offsetX: 2,
                    offsetY: 1,
                    blur: 2,
                },
            ],
            transition: {
                start: {
                    preset: 'none',
                    duration: 0,
                    easing: 'linear',
                },
                end: {
                    preset: 'none',
                    duration: 0,
                    easing: 'linear',
                },
            },
        },
    },
    {
        name: 'Glitch',
        styles: {
            fontFamily: 'monospace',
            fontVariant: '400',
            italics: false,
            underline: false,
            fontSize: 19,
            alignment: 'center',
            fill: '#ffffff',
            stroke: {
                color: '#000000',
                width: 10,
            },
            position: {
                horizontal: 'auto',
                vertical: 80,
                useLines: false,
            },
            box: {
                color: '#000000',
                opacity: 0,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            shadow: [
                {
                    color: '#00eeff',
                    offsetX: -2,
                    offsetY: -1,
                    blur: 1,
                },
                {
                    color: '#ff00f7',
                    offsetX: 2,
                    offsetY: 1,
                    blur: 1,
                },
            ],
            transition: {
                start: {
                    preset: 'none',
                    duration: 0,
                    easing: 'linear',
                },
                end: {
                    preset: 'none',
                    duration: 0,
                    easing: 'linear',
                },
            },
        },
    },
    {
        name: 'Neon',
        styles: {
            fontFamily: 'monospace',
            fontVariant: '400',
            italics: false,
            underline: false,
            fontSize: 19,
            alignment: 'center',
            fill: '#000000',
            stroke: {
                color: '#ee00ff',
                width: 4,
            },
            position: {
                horizontal: 'auto',
                vertical: 80,
                useLines: false,
            },
            box: {
                color: '#000000',
                opacity: 0,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            shadow: [
                {
                    color: '#ee00ff',
                    offsetX: 0,
                    offsetY: 0,
                    blur: 10,
                },
            ],
            transition: {
                start: {
                    preset: 'fade-in',
                    duration: 1,
                    easing: 'ease-in-out',
                },
                end: {
                    preset: 'fade-out',
                    duration: 1,
                    easing: 'ease-in-out',
                },
            },
        },
    },
    {
        name: 'Steel',
        styles: {
            fontFamily: 'sans-serif',
            fontVariant: '700',
            italics: false,
            underline: false,
            fontSize: 21,
            alignment: 'center',
            fill: '#b5b5b5',
            stroke: {
                color: '#ffffff',
                width: 0,
            },
            position: {
                horizontal: 50,
                vertical: 77,
                useLines: false,
            },
            box: {
                color: '#000000',
                opacity: 0,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            shadow: [
                {
                    color: '#5b6367',
                    offsetX: 2,
                    offsetY: 2,
                    blur: 0,
                },
                {
                    color: '#f5fdff',
                    offsetX: -1,
                    offsetY: -2,
                    blur: 0,
                },
                {
                    color: '#000000',
                    offsetX: 4,
                    offsetY: 2,
                    blur: 5,
                },
            ],
            transition: {
                start: {
                    preset: 'none',
                    duration: 0,
                    easing: 'linear',
                },
                end: {
                    preset: 'none',
                    duration: 0,
                    easing: 'linear',
                },
            },
        },
    },
    {
        name: 'Scaling',
        styles: {
            fontFamily: 'sans-serif',
            fontVariant: '400',
            italics: false,
            underline: false,
            fontSize: 16,
            alignment: 'center',
            fill: '#ffffff',
            stroke: {
                color: '#000000',
                width: 0,
            },
            position: {
                horizontal: 'auto',
                vertical: 80,
                useLines: false,
            },
            box: {
                color: '#000000',
                opacity: 253,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            shadow: [],
            transition: {
                start: {
                    preset: 'scale-down-in',
                    duration: 1,
                    easing: 'ease-out',
                },
                end: {
                    preset: 'scale-down-out',
                    duration: 1,
                    easing: 'ease-in',
                },
            },
        },
    },
]