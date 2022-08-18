const template = document.createElement('template')

template.innerHTML = [
	`<iframe scrolling="yes" src="#preview"></iframe>`,
	`<ul>`,
		`<li><a href="#storybook" target="_blank">Storybook</a></li>`,
		`<li><a href="#github" target="_blank">Github</a></li>`,
	`</ul>`,
].join('')

requestAnimationFrame(() => {
	for (const el of document.querySelectorAll('.storybook-demo')) {
		const style = getComputedStyle(el)
		const content = template.content.cloneNode(true)

		content.querySelector('[src="#preview"]').src = `https://beta-astro-components.netlify.app/iframe.html?id=${style.getPropertyValue('--StorybookId').trim()}&viewMode=story`
		content.querySelector('[href="#storybook"]').href = `https://astro-components.netlify.app/?path=/story/${style.getPropertyValue('--StorybookId').trim()}`
		content.querySelector('[href="#github"]').href = `https://github.com/RocketCommunicationsInc/astro/tree/main/packages/web-components/src/components/${style.getPropertyValue('--GitHubId').trim()}`

		el.append(content)
	}
})
