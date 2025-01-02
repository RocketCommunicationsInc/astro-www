// @ts-expect-error
import { default as IconSearch } from './glossary-search.astro'

export default Object.assign(IconSearch, { }) as typeof IconSearch & {
}
