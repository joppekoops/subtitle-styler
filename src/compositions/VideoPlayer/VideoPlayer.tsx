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
        // TODO: Uncomment if needed: Wait a second to make sure the cues are loaded
        // await new Promise((resolve) => setTimeout(resolve, 1000))

        // Set cue list when the video is ready
        if (track?.cues) {
            setCues(Array.from(track.cues).map((cue) => cue as VTTCue))
        }
    }

    // TODO: Add logic to convert .srt to .vtt
    return (
        <div>
            <div className={`video-player ${className}`}>
                <video
                    {...htmlVideoProps}
                    ref={videoPlayerElement}
                    controls
                    defaultChecked
                    onLoadedMetadata={handleCuesChange}
                    className="video-player__video"
                >
                    <source src={src} />
                    <track
                        ref={trackElement}
                        label="Subs"
                        src={subtitleSrc}
                        defaultChecked
                    />
                </video>
                <div className="video-player__cue-labels">
                    {cues && videoPlayerElement?.current && (cues.map((cue, index) => (
                        <button
                            key={index}
                            title={cue.text}
                            onClick={() => setCueByIndex(index)}
                            className="video-player__cue-label"
                            style={{
                                left: `${cue.startTime / videoPlayerElement!.current!.duration * 100}%`,
                                width: `${(cue.endTime - cue.startTime) / videoPlayerElement!.current!.duration * 100}%`,
                            }}
                        />
                    )))}
                </div>
            </div>

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

            <button onClick={handleExport}>Export</button>
        </div>
    )
}
