// @ts-expect-error
import { default as GlossarySearch } from './glossary-search.astro'

export default Object.assign(GlossarySearch, { }) as typeof GlossarySearch & {
}
