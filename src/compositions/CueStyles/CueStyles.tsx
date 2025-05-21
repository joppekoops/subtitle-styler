import { ChangeEvent, FC, ReactElement } from 'react'

import { CueTextEditor, PositionControls } from '@app-compositions'
import { Icon, OptionsBar, ToggleButton } from '@app-components'
import { Preset } from '@app-entities'
import { getCueWithHtml, htmlToVttContent } from '@app-helpers'

import './CueStyles.scss'

export interface CueStylesProps {
    cue?: VTTCue
    cueIndex?: number
    presets: Preset[]
    onCueChange: (cueIndex: number, updates: Partial<VTTCue>) => void
    className?: string
}

export const CueStyles: FC<CueStylesProps> = ({
    cue,
    cueIndex,
    presets,
    onCueChange,
    className = '',
}): ReactElement => {

    const handleCueTextChange = (text: string, index: number) => {
        onCueChange(index, { text: htmlToVttContent(text) })
    }

    const handleCuePositionChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        if (event.target.name === 'position.horizontal') {
            onCueChange(index, {
                position: Number(event.target.value),
            })
        } else if (event.target.name === 'position.vertical') {
            onCueChange(index, {
                line: Number(event.target.value),
            })
        } else if (event.target.name === 'position.useLines') {
            onCueChange(index, {
                snapToLines: event.target.checked,
            })
        } else if (event.target.name === 'alignment') {
            onCueChange(index, {
                align: event.target.value as AlignSetting,
            })
        }
    }

    if (! cue || ! cueIndex) {
        return (
            <div className="cue-styles__empty">No cue selected</div>
        )
    }

    return (
        <div className={`cue-styles ${className}`}>
            <section className="styling-section cue-styles__text-section">
                <h3 className="sr-only">Text</h3>
                <CueTextEditor
                    cueText={getCueWithHtml(cue).html}
                    presets={presets}
                    onChange={(html) => handleCueTextChange(html, cueIndex)}
                />
            </section>
            <form className="cue-styles__form">
                <section className="styling-section">
                    <h3>Typography</h3>

                    <div className="global-styles__control-row">
                        <OptionsBar label="Alignment">
                            <ToggleButton
                                name="alignment"
                                value="left"
                                type="radio"
                                checked={cue.align === 'left' || cue.align === 'start'}
                                onChange={(event) => handleCuePositionChange(event, cueIndex)}
                            >
                                <Icon name="alignLeft" aria-label="left" />
                            </ToggleButton>
                            <ToggleButton
                                name="alignment"
                                value="center"
                                type="radio"
                                checked={cue.align === 'center' || ! cue.align}
                                onChange={(event) => handleCuePositionChange(event, cueIndex)}
                            >
                                <Icon name="alignCenter" aria-label="center" />
                            </ToggleButton>
                            <ToggleButton
                                name="alignment"
                                value="right"
                                type="radio"
                                checked={cue.align === 'right' || cue.align === 'end'}
                                onChange={(event) => handleCuePositionChange(event, cueIndex)}
                            >
                                <Icon name="alignRight" aria-label="right" />
                            </ToggleButton>
                        </OptionsBar>
                    </div>
                </section>

                <PositionControls
                    position={{
                        horizontal: cue.position,
                        vertical: cue.line,
                        useLines: cue.snapToLines,
                    }}
                    onInput={(event) => handleCuePositionChange(event, cueIndex)}
                    className="styling-section"
                />
            </form>
        </div>
    )
}