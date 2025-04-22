import { ShadowStyles, TransitionStyles } from '@app-entities'

export interface CaptionStyles {
    fontFamily: string
    fontVariant: string
    bold: boolean
    italics: boolean
    underline: boolean
    fontSize: number
    alignment: AlignSetting
    fill: string
    stroke: {
        color: string
        width: number
    }
    position: {
        horizontal: LineAndPositionSetting
        vertical: LineAndPositionSetting
        useLines: boolean
    }
    box: {
        color: string
        opacity: number
        padding: {
            top: number
            right: number
            bottom: number
            left: number
        }
    }
    shadow: ShadowStyles[]
    transition: {
        start: TransitionStyles
        end: TransitionStyles
    }
}