import { get, has } from 'lodash'

import { enTranslations } from './translations'

export const translate = (key: string, vars: {} = {}): string => {
    if (! has(enTranslations, key)) {
        throw new Error(`Translation for key "${key}" not found`)
    }

    const translation = get(enTranslations, key)

    if (! (typeof translation === 'string')) {
        throw new Error(`Translation for key "${key}" is not a string`)
    }

    return translation.replace(/\{(\w+)\}/g, (_, varName) => get(vars, varName))
}