import { Preset } from '@app-entities'

export const isNumber = (value: unknown): value is number => typeof value === 'number'

export const isPreset = (value: any): value is Preset => !! value.name && !! value.styles