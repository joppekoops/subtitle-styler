import { FC, RefAttributes, useEffect, useRef, useState, VideoHTMLAttributes } from 'react'
import { WebVTTParser, WebVTTSerializer } from 'webvtt-parser'

import { cueToWebVTT } from '@app-helpers'
import vttData from '@app-resources/test-en.vtt'

import './VideoPlayer.scss'

export interface VideoPlayerProps extends VideoHTMLAttributes<HTMLVideoElement>, RefAttributes<HTMLVideoElement> {
    subtitleSrc?: string
    showSubtitlesByDefault?: boolean
    className?: string
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
    src,
    subtitleSrc,
    showSubtitlesByDefault = true,
    className = '',
    ...htmlVideoProps
}) => {
    const [track, setTrack] = useState<TextTrack | null>(null)
    const [cues, setCues] = useState<VTTCue[] | null>(null)

    const videoPlayerElement = useRef<HTMLVideoElement>(null)
    const trackElement = useRef<HTMLTrackElement>(null)

    useEffect(() => {
        if (! trackElement.current) {
            return
        }

        setTrack(trackElement.current.track)

        // Refresh cue list if the track (and its cues) changes
        trackElement.current.addEventListener('cuechange', () => handleCuesChange())
        void handleCuesChange()

        if (showSubtitlesByDefault) {
            trackElement.current.track.mode = 'showing'
        }
    }, [trackElement])

    const handleExport = () => {
        const parser = new WebVTTParser()
        const serializer = new WebVTTSerializer()

        const parsedVttData = parser.parse(vttData)
        //console.log('Source VTT data:')
        console.log(parsedVttData)

        parsedVttData.cues[1].text = 'Hello, world!'
        parsedVttData.cues[1].alignment = 'start'

        //const exportedVttData = serializer.serialize(parsedVttData.cues)
        //const parsedCues = cues?.map((cue) => cueToWebVTT(cue))

        //console.log({ parsedCues })
        const exportedVttData = serializer.serialize(parsedVttData.cues, [
            '::cue { background: yellow; color: purple; }',
        ])
        //console.log('Exported VTT data:')
        console.log(exportedVttData)
    }

    const setCueByIndex = (index: number): void => {
        videoPlayerElement.current!.currentTime = videoPlayerElement.current!.textTracks[0].cues![index].startTime
    }

    const handleCuesChange = async () => {
        await new Promise((resolve) => setTimeout(resolve, 200))

        // Set cue list when the video is ready
        if (track?.cues) {
            setCues(Array.from(track.cues).map((cue) => cue as VTTCue))
        }
    }

    function setProperty(property: string, value: string) {
        videoPlayerElement.current?.style.setProperty(property, value);
    }

    // TODO: Add logic to convert .srt to .vtt
    return (
        <div>
            <video
                {...htmlVideoProps}
                ref={videoPlayerElement}
                controls
                defaultChecked
                onLoadedMetadata={handleCuesChange}
                className={`video-player ${className}`}
            >
                <source src={src} />
                <track
                    ref={trackElement}
                    label="Subs"
                    src={subtitleSrc}
                    defaultChecked
                />
            </video>

            {/*<section className="">
                <form action="" className="styles-form">
                    <h2>Global Styles</h2>
                    <div className="controls-row">
                        <h3>Colour</h3>
                        <label>
                            Text
                            <input type="color" id="textColor" defaultValue={'#FFFFFF'} onInput={(event) => setProperty('--text-color', event.currentTarget.value)}/>
                        </label>
                        <label>
                            Background
                            <input type="color" id="backgroundColor" defaultValue={'#000000'} onInput={(event) => setProperty('--background-color', event.currentTarget.value)}/>
                        </label>
                    </div>

                    <div className="controls-row">
                        <h3>Typography</h3>
                        <label>
                            Font Size
                            <input type="number" id="fontSize" defaultValue={16} onInput={(event) => setProperty('--font-size', event.currentTarget.value + 'px')}/>
                        </label>
                        <label>
                            Font Family
                            <select id="fontFamily" defaultValue={'sans-serif'} onInput={(event) => setProperty('--font-family', event.currentTarget.value)}>
                                <option value="sans-serif">Sans Serif</option>
                                <option value="serif">Serif</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="monospace">Monospace</option>
                            </select>
                        </label>
                    </div>

                    <div className="controls-row">
                        <h3>Shadow</h3>
                        <label>
                            Colour
                            <input type="color" id="shadowColor" defaultValue={'#000000'} onInput={(event) => setProperty('--text-shadow-color', event.currentTarget.value)}/>
                        </label>
                        <label>
                            X
                            <input type="number" id="shadowX" defaultValue={0} onInput={(event) => setProperty('--text-shadow-x', event.currentTarget.value + 'px')}/>
                        </label>
                        <label>
                            Y
                            <input type="number" id="shadowY" defaultValue={0} onInput={(event) => setProperty('--text-shadow-y', event.currentTarget.value + 'px')}/>
                        </label>
                        <label>
                            Blur
                            <input type="number" id="shadowBlur" defaultValue={0} onInput={(event) => setProperty('--text-shadow-blur', event.currentTarget.value + 'px')}/>
                        </label>
                    </div>
                </form>
            </section>

            <section className="panel timeline-section">
                {cues && (
                    <ul>
                        {cues.map((cue, index) => (
                            <li key={index}>
                                <p>{cue.text}</p>
                                <button onClick={() => setCueByIndex(index)}>Go to cue {index + 1}</button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <button onClick={handleExport}>Export</button>*/}
        </div>
    )
}
