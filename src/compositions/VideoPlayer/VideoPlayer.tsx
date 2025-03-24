import Plyr from 'plyr'
import { FC, ReactElement, RefAttributes, useEffect, useRef, useState, VideoHTMLAttributes } from 'react'

import { Cue } from '@app-components'
import { renderCueHtml } from '@app-helpers'

import 'plyr/src/sass/plyr.scss'
import './VideoPlayer.scss'

export interface VideoPlayerProps extends VideoHTMLAttributes<HTMLVideoElement>, RefAttributes<HTMLVideoElement> {
    subtitleSrc?: string
    showSubtitlesByDefault?: boolean
    activeCueIndex?: number
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
    plyrOptions,
    onCuesLoaded,
    onActiveCuesChanged,
    onTimeChanged,
    className = '',
    ...htmlVideoProps
}): ReactElement => {
    const videoPlayerContainerElement = useRef<HTMLDivElement>(null)
    const videoPlayerElement = useRef<HTMLVideoElement>(null)
    const trackElement = useRef<HTMLTrackElement>(null)
    const [activeCues, setActiveCues] = useState<VTTCue[]>([])

    let player: Plyr | null = null

    const activeCuesWithHtml = activeCues.map(cue => renderCueHtml(cue))

    const handleCuesChange = async () => {
        if (! trackElement.current) {
            return
        }

        await new Promise((resolve) => setTimeout(resolve, 200))

        // Set cue list when the video is ready
        if (trackElement.current.track?.cues) {
            const cues = Array.from(trackElement.current.track.cues).map((cue) => cue as VTTCue)
            onCuesLoaded(cues)
        }
    }

    const handleActiveCuesChange = async () => {
        if (! trackElement.current) {
            return
        }

        // Update active cues when one or more (dis)appear
        if (trackElement.current.track?.activeCues && trackElement.current.track?.cues) {
            const cues = Array.from(trackElement.current.track.cues).map((cue) => cue as VTTCue)
            const activeCues = Array.from(trackElement.current.track.activeCues).map((cue) => cue as VTTCue)
            setActiveCues(activeCues)
            onActiveCuesChanged(activeCues, cues.indexOf(activeCues[0]))
        }
    }

    const handleTimeChange = () => {
        if (videoPlayerElement.current) {
            onTimeChanged(videoPlayerElement.current.currentTime)
        }
    }

    const setCueByIndex = (index: number): void => {
        videoPlayerElement.current!.currentTime = videoPlayerElement.current!.textTracks[0].cues![index].startTime
    }

    useEffect(() => {
        if (! trackElement.current) {
            return
        }

        // Refresh cue list if the track (and its cues) changes
        trackElement.current.addEventListener('cuechange', () => handleActiveCuesChange())
        void handleCuesChange()

        if (showSubtitlesByDefault) {
            trackElement.current.track.mode = 'showing'
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
                'mute',
                'volume',
                'settings',
                'fullscreen',
            ],
            hideControls: false,
            invertTime: false,
            ...plyrOptions,
        })

        player.fullscreen.toggle = async () => {
            if (document.fullscreenElement) {
                await document.exitFullscreen()
            } else {
                await videoPlayerContainerElement?.current?.requestFullscreen()
            }
        }
    }, [videoPlayerContainerElement.current, videoPlayerElement.current])

    return (
        <div
            ref={videoPlayerContainerElement}
            className={`video-player ${className}`}
            style={{
                width: videoPlayerElement.current
                    && videoPlayerElement.current.offsetWidth > videoPlayerElement.current.offsetHeight
                        ? '100%'
                        : 'auto',
                height: videoPlayerElement.current
                    && videoPlayerElement.current.offsetWidth < videoPlayerElement.current.offsetHeight
                        ? '100%'
                        : 'auto',
            }}
        >
            <div className="video-player__cue-container">
                {activeCuesWithHtml.map((cue, index) => (
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
                defaultChecked
                onLoadedMetadata={handleCuesChange}
                onTimeUpdate={handleTimeChange}
                className="video-player__video"
            >
                <source src={src} />
                <track
                    ref={trackElement}
                    kind="metadata"
                    src={subtitleSrc}
                    defaultChecked
                />
            </video>
        </div>
    )
}
