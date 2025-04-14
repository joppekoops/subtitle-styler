import { ShadowStyles, TransitionStyles } from '@app-entities'
import { DataType } from 'csstype'

export interface CaptionStyles {
    fontFamily: string
    fontVariant: string
    bold: boolean
    italics: boolean
    underline: boolean
    fontSize: number
    alignment: AlignSetting
    fill: DataType.Color
    stroke: {
        color: DataType.Color
        width: number
    },
    position: {
        horizontal: LineAndPositionSetting
        vertical: LineAndPositionSetting
        useLines: boolean
    }
    box: {
        color: DataType.Color
        opacity: number
        padding: {
            top: number
            right: number
            bottom: number
            left: number
        },
    },
    shadow: ShadowStyles[]
    transition: {
        start: TransitionStyles
        end: TransitionStyles
    }
}