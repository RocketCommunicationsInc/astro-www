const range = new Range()

export const html = range.createContextualFragment.bind(range) as (fragment: string) => DocumentFragment

range.selectNodeContents(document.createElement('template'))
