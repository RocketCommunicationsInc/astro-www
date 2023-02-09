import rawDarkTokens from '@astrouxds/tokens/dist/json/docs.json'
import rawLiteTokens from '@astrouxds/tokens/dist/json/docs-light.json'
import { normalizeToken, sortToken, transformComponentTokensByType, transformTokensByType } from './tokens-utils.js'

/** Array of all Lite-Theme Tokens. */
export const liteTokens = rawLiteTokens.map(normalizeToken).sort(sortToken)

/** Array of all Dark-Theme Tokens. */
export const darkTokens = rawDarkTokens.map(normalizeToken).sort(sortToken)

/** Catalog of all Component Tokens, organized by Component. */
export const componentTokens = transformComponentTokensByType('component')(darkTokens, liteTokens)

/** Catalog of all Reference Tokens, organized by Category. */
export const referenceTokens = transformTokensByType('reference')(darkTokens, liteTokens)

/** Catalog of all System Tokens, organized by Category. */
export const systemTokens = transformTokensByType('system')(darkTokens, liteTokens)
