import { FC, ReactElement, RefAttributes, useEffect, useRef, useState, VideoHTMLAttributes } from 'react'

export interface VideoPlayerProps extends VideoHTMLAttributes<HTMLVideoElement>, RefAttributes<HTMLVideoElement> {
    subtitleSrc?: string
    showSubtitlesByDefault?: boolean
    activeCueIndex?: number
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
    onCuesLoaded,
    onActiveCuesChanged,
    onTimeChanged,
    className = '',
    ...htmlVideoProps
}): ReactElement => {
    const videoPlayerElement = useRef<HTMLVideoElement>(null)
    const trackElement = useRef<HTMLTrackElement>(null)

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

    return (
        <div className={`video-player ${className}`}>
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
                    label="Subtitles"
                    src={subtitleSrc}
                    defaultChecked
                />
            </video>
        </div>
    )
}
