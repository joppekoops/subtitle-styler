import Plyr from 'plyr'
import { FC, ReactElement, RefAttributes, useEffect, useRef, VideoHTMLAttributes } from 'react'

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

    let player: Plyr | null = null

    const handleCuesChange = async () => {
        if (! trackElement.current) {
            return
        }

        await new Promise((resolve) => setTimeout(resolve, 200))

        // Set cue list when the video is ready
        if (trackElement.current.track?.cues) {
            onCuesLoaded(Array.from(trackElement.current.track.cues).map((cue) => cue as VTTCue))
        }
    }

    const handleActiveCuesChange = async () => {
        if (! trackElement.current) {
            return
        }

        await new Promise((resolve) => setTimeout(resolve, 200))

        // Update active cues when one or more (dis)appear
        if (trackElement.current.track?.cues && trackElement.current.track?.activeCues) {
            const cues: VTTCue[] = Array.from(trackElement.current.track.cues).map((cue) => cue as VTTCue)
            const activeCues: VTTCue[] = Array.from(trackElement.current.track.activeCues).map((cue) => cue as VTTCue)
            onActiveCuesChanged(activeCues, cues.indexOf(activeCues[0]))
        }
    }

    const handleTimeChange = () => {
        if(videoPlayerElement.current) {
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
                'play-large',
                'play',
                'progress',
                'current-time',
                'mute',
                'volume',
                'captions',
                'settings',
                'airplay',
                'fullscreen',
            ],
            ...plyrOptions,
        })

        player.fullscreen.toggle = async () => {
            await videoPlayerContainerElement?.current?.requestFullscreen()

            // TODO: Make player fit the parent container
        }

    }, [videoPlayerContainerElement.current, videoPlayerElement.current])

    return (
        <div ref={videoPlayerContainerElement} className={`video-player ${className}`}>
            <div style={{ position: 'absolute', left: 0, bottom: '30px', zIndex: 2, width: '300px', height: '40px', background: 'red' }}></div>
            <video
                {...htmlVideoProps}
                ref={videoPlayerElement}
                controls
                defaultChecked
                disablePictureInPicture
                onLoadedMetadata={handleCuesChange}
                onTimeUpdate={handleTimeChange}
                className="video-player__video"
            >
                <source src={src} />
                <track
                    ref={trackElement}
                    label="Subtitles"
                    src={subtitleSrc}
                    defaultChecked
                />
            </video>
        </div>
    )
}
