const template = document.createElement('template')

template.innerHTML = [
	`<div class="demo-container">`,
	`<iframe id="live-sample" scrolling="yes" src="#preview"></iframe>`,
	`<div class="demo-container__sample-links">`,
		`<a href="#storybook" target="_blank" class="sample-links__storybook">Storybook</a>`,
		`<a href="#github" target="_blank" class="sample-links__github">Github</a>`,
	`</div>`,
	`</div>`
].join('')

for (const el of document.querySelectorAll('.storybook-demo')) {
	const style = getComputedStyle(el)
	const content = template.content.cloneNode(true)

	content.querySelector('[src="#preview"]').src = `${metaData.storybookURL}iframe.html?id=${style.getPropertyValue('--StorybookId').trim()}&viewMode=story`
	content.querySelector('[href="#storybook"]').href = `${metaData.storybookURL}?path=/story/${style.getPropertyValue('--StorybookId').trim()}`
	content.querySelector('[href="#github"]').href = `${metaData.repo}/tree/${metaData.branch}/packages/web-components/src/components/${style.getPropertyValue('--GitHubId').trim()}`

	el.append(content)
}
