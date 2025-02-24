// Convert <c.foo-bar> to <c class="foo-bar">
export const getCueHtml = (cue: VTTCue): string => cue.text.replace(/<c\.(.*?)>/g, '<c class="$1">')
