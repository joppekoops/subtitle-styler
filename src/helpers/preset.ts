// TODO: move to entities
export interface Preset {
    name: string
    styles: string
}

export const presetNameToSlug = (name: string): string => {
    return name.toLowerCase().replace(/-/g, '_').replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
}

export const slugToPresetName = (slug: string): string => {
    return slug.replace(/-/g, ' ').replace(/_/g, '-').split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export const getPresetFromStyles = (styleBlock: string): Preset => {
    const cssClass = (styleBlock.split('::cue(.')?.[1]?.split(')')?.[0] || '')
    const name = slugToPresetName(cssClass)
    const styles = styleBlock.replace(`::cue(.${cssClass})`, `c.${cssClass}`)

    return {
        name,
        styles
    }
}
