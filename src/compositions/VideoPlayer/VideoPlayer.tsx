import Plyr from 'plyr'
import { FC, ReactElement, RefAttributes, useEffect, useRef, useState, VideoHTMLAttributes } from 'react'

import { Cue } from '@app-components'
import { waitUntil, getCueWithHtml, updateCueContainerStyle } from '@app-helpers'
import { CueWithHtml } from '@app-entities'

import 'plyr/src/sass/plyr.scss'
import './VideoPlayer.scss'

export interface VideoPlayerProps extends VideoHTMLAttributes<HTMLVideoElement>, RefAttributes<HTMLVideoElement> {
    subtitleSrc?: string
    showSubtitlesByDefault?: boolean
    activeCueIndex?: number
    currentTime: number
    plyrOptions?: Plyr.Options
    onCuesLoaded: (cues: VTTCue[]) => void
    onActiveCuesChanged: (cues: VTTCue[], index: number) => void
    onTimeChanged: (time: number) => void
    className?: string
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
    src,
    subtitleSrc,
    showSubtitlesByDefault = true,
    activeCueIndex,
    currentTime,
    plyrOptions,
    onCuesLoaded,
    onActiveCuesChanged,
    onTimeChanged,
    className = '',
    ...htmlVideoProps
}): ReactElement => {
    const videoPlayerContainerElement = useRef<HTMLDivElement>(null)
    const cueContainerElement = useRef<HTMLDivElement>(null)
    const videoPlayerElement = useRef<HTMLVideoElement>(null)
    const trackElement = useRef<HTMLTrackElement>(null)
    const [activeCues, setActiveCues] = useState<CueWithHtml[]>([])

    let player: Plyr | null = null

    const handleCuesChange = async () => {
        if (! trackElement.current) {
            return
        }

        await waitUntil(() => trackElement.current?.track?.cues !== null)

        if (trackElement.current?.track?.cues) {
            const cues = Array.from(trackElement.current.track.cues) as VTTCue[]
            onCuesLoaded(cues)
        }
    }

    const handleActiveCuesChange = () => {
        if (! trackElement.current || ! trackElement.current.track.activeCues || ! trackElement.current.track.cues) {
            return
        }

        // Update active cues when one or more (dis)appear
        const cues = Array.from(trackElement.current.track.cues) as VTTCue[]
        const activeCues = Array.from(trackElement.current.track.activeCues) as VTTCue[]
        const activeCuesWithHtml = activeCues.map(cue => getCueWithHtml(cue))
        setActiveCues(activeCuesWithHtml)
        onActiveCuesChanged(activeCues, cues.indexOf(activeCues[0]))
    }

    const handleTimeChange = () => {
        if (videoPlayerElement.current) {
            onTimeChanged(videoPlayerElement.current.currentTime)
        }
    }

    const setCueByIndex = (index: number): void => {
        if (! videoPlayerElement.current || ! videoPlayerElement.current.textTracks[0].cues) {
            return
        }

        videoPlayerElement.current.currentTime = videoPlayerElement.current.textTracks[0].cues[index].startTime
    }

    // Resize observer to update cue container style when the video player is resized
    const videoResizeHandler = () => {
        if (! videoPlayerContainerElement.current) {
            return
        }

        const resizeObserver = new ResizeObserver(() => updateCueContainerStyle(
            videoPlayerElement.current,
            videoPlayerContainerElement.current,
            cueContainerElement.current,
        ))

        resizeObserver.observe(videoPlayerContainerElement.current)

        return () => {
            resizeObserver.disconnect()
        }
    }

    const plyrToggleFullscreen = async () => {
        if (document.fullscreenElement) {
            await document.exitFullscreen()
        } else {
            await videoPlayerContainerElement?.current?.requestFullscreen()
        }
    }

    const handleMetadataLoaded = async () => {
        videoResizeHandler()
        await handleCuesChange()
    }

    useEffect(() => {
        if (! trackElement.current) {
            return
        }

        // Refresh cue list if the track (and its cues) changes
        trackElement.current.addEventListener('cuechange', handleActiveCuesChange)
        void handleCuesChange()

        if (showSubtitlesByDefault) {
            trackElement.current.track.mode = 'showing'
        }

        return () => {
            trackElement.current?.removeEventListener('cuechange', handleCuesChange)
        }
    }, [trackElement])

    useEffect(() => {
        if (activeCueIndex !== undefined) {
            setCueByIndex(activeCueIndex)
        }
    }, [activeCueIndex])

    useEffect(() => {
        if (! videoPlayerElement.current || ! videoPlayerContainerElement.current || player) {
            return
        }

        player = new Plyr(videoPlayerElement.current, {
            controls: [
                'play',
                'progress',
                'current-time',
                'duration',
                'fullscreen',
            ],
            hideControls: false,
            invertTime: false,
            ...plyrOptions,
        })

        player.fullscreen.toggle = plyrToggleFullscreen
    }, [videoPlayerContainerElement.current, videoPlayerElement.current])

    useEffect(() => {
        if (! videoPlayerElement.current) {
            return
        }

        videoPlayerElement.current.currentTime = currentTime
    }, [currentTime, videoPlayerElement.current])

    return (
        <div
            ref={videoPlayerContainerElement}
            className={`video-player ${className}`}
        >
            <div
                ref={cueContainerElement}
                className="video-player__cue-container"
            >
                {activeCues.map((cue, index) => (
                    <Cue
                        key={index}
                        cueProperties={cue}
                    >
                        <span dangerouslySetInnerHTML={{ __html: cue.html }}></span>
                    </Cue>
                ))}
            </div>
            <video
                {...htmlVideoProps}
                ref={videoPlayerElement}
                controls
                onLoadedMetadata={handleMetadataLoaded}
                onTimeUpdate={handleTimeChange}
                className="video-player__video"
            >
                <source src={src} />
                <track
                    ref={trackElement}
                    kind="metadata"
                    src={subtitleSrc}
                />
            </video>
        </div>
    )
}
