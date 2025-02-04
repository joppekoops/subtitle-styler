import { FC, RefAttributes, useEffect, useRef, VideoHTMLAttributes } from 'react'
import { WebVTTParser, WebVTTSerializer } from 'webvtt-parser'

import { cueToWebVTT } from '@app-helpers'
import encodedVttData from '@app-resources/test-en.vtt?inline'

import './VideoPlayer.scss'

console.log(encodedVttData)

const vttData = atob(encodedVttData.split('data:text/vtt;base64,').join(''))

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
    const videoPlayerElement = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (showSubtitlesByDefault && videoPlayerElement?.current) {
            const [firstTrack] = videoPlayerElement.current.textTracks
            console.log({ firstTrack })
            if (firstTrack) {
                firstTrack.mode = 'showing'
            }
        }
    }, [videoPlayerElement])

    const handleExport = () => {
        const parser = new WebVTTParser()
        const serializer = new WebVTTSerializer()

        const parsedVttData = parser.parse(vttData)
        //console.log('Source VTT data:')
        console.log(parsedVttData)

        parsedVttData.cues[1].text = 'Hello, world!'
        parsedVttData.cues[1].alignment = 'start'

        //const exportedVttData = serializer.serialize(parsedVttData.cues)

        const currentTrack = videoPlayerElement.current?.textTracks[0]
        if (!currentTrack) {
            console.error('No text track found')
            return
        }

        //const trackCues = Array.from(currentTrack.cues!)
        //const parsedCues = trackCues.map((cue) => cueToWebVTT(cue as VTTCue))

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

    // TODO: Add logic to convert .srt to .vtt
    return (
        <div>
            <video
                {...htmlVideoProps}
                ref={videoPlayerElement}
                controls
                defaultChecked
                className={`video-player ${className}`}
            >
                <source src={src} />
                <track
                    label="Subs"
                    src={subtitleSrc}
                    defaultChecked
                />
            </video>
            <button onClick={() => setCueByIndex(0)}>Go to cue 1</button>
            <button onClick={() => setCueByIndex(1)}>Go to cue 2</button>
            <button onClick={() => setCueByIndex(2)}>Go to cue 3</button>
            <button onClick={handleExport}>Export to vtt</button>
        </div>
    )
}
