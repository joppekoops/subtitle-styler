import { PositionStyles, ShadowStyles, TransitionStyles } from '@app-entities'

export interface CaptionStyles {
    fontFamily: string
    fontVariant: string
    italics: boolean
    underline: boolean
    fontSize: number
    alignment: AlignSetting
    fill: string
    stroke: {
        color: string
        width: number
    }
    position: PositionStyles,
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