// Update cue container style based on video aspect ratio when the video is loaded or resized
// This is necessary because height 100% in css does contain the video in the container

export const updateCueContainerStyle = (
    videoPlayerElement: HTMLVideoElement | null,
    videoPlayerContainerElement: HTMLDivElement | null,
    cueContainerElement: HTMLDivElement | null,
) => {
    if (! videoPlayerElement || ! videoPlayerContainerElement || ! cueContainerElement) {
        return
    }

    const videoAspectRatio = videoPlayerElement.videoWidth / videoPlayerElement.videoHeight
    const containerAspectRatio =
        videoPlayerContainerElement.clientWidth / (videoPlayerContainerElement.clientHeight - 52)

    cueContainerElement.style.setProperty(
        'width',
        videoAspectRatio > containerAspectRatio ? '100%' : 'auto',
    )
    cueContainerElement.style.setProperty(
        'height',
        videoAspectRatio < containerAspectRatio ? 'calc(100% - var(--plyr-controls-height))' : 'auto',
    )
    cueContainerElement.style.setProperty(
        'aspect-ratio',
        `${videoPlayerElement.videoWidth} / ${videoPlayerElement.videoHeight}`,
    )
}