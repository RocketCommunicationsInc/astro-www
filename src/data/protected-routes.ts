export const protectedRoutes = [
  '/getting-started/',
  '/getting-started/designers/',
  '/getting-started/developers/',
  '/design-tokens/installation/',
  '/design-tokens/reference/',
  '/design-tokens/system/',
  '/design-tokens/component/',
  '/components/accordion/',
  '/components/application-state/',
  '/separator',
  '/components/button/',
  '/components/card/',
  '/components/checkbox/',
  '/components/classification-markings/',
  '/components/clock/',
  '/components/container/',
  '/components/date-picker/',
  '/components/dialog/',
  '/components/global-status-bar/',
  '/components/icons-and-symbols/',
  '/components/icon-library/',
  '/components/input-field/',
  '/components/link/',
  '/components/log/',
  '/components/notification-banner/',
  '/components/pagination/',
  '/components/pop-up/',
  '/components/progress/',
  '/components/push-button/',
  '/components/radio-button/',
  '/components/search/',
  '/components/segmented-button/',
  '/components/select/',
  '/components/slider/',
  '/components/status-symbol/',
  '/components/switch/',
  '/components/tabs/',
  '/components/tag/',
  '/components/textarea/',
  '/components/timeline/',
  '/components/toast/',
  '/components/tooltip/',
  '/components/tree/',
  '/patterns/',
  '/patterns/application-feedback/',
  '/patterns/breadcrumbs/',
  '/patterns/data-visualization/',
  '/patterns/focus/',
  '/patterns/forms-and-validation/',
  '/patterns/modeless-panes/',
  '/patterns/navigation/',
  '/patterns/notifications/',
  '/patterns/pop-up-menu/',
  '/patterns/scrolling-behavior/',
  '/patterns/sign-in/',
  '/patterns/status-system/',
  '/patterns/table/',
  '/patterns/',
  '/platforms/astro-for-r2c2/',
  '/resources/downloads/'
]

const titleCase = (input: string) =>
  input
    .replace(/[-_]+/g, ' ') // convert hyphens/underscores to spaces
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

export function getCompletelyBlockedParents(routes: string[]): string[] {
  const normalize = (r: string) => r.replace(/^\/|\/$/g, '') // trim leading/trailing slashes
  const isSingleSegment = (s: string) => s && !s.includes('/')
  const parents = routes
    .map(normalize)
    .filter(isSingleSegment)
    .map(titleCase)

  return Array.from(new Set(parents))
}
