const template = document.createElement('template')
import metaData from 'project:utils/meta'

template.innerHTML = [
	`<div class="demo-container">`,
	`<iframe id="live-sample" scrolling="yes" src="#preview"></iframe>`,
	`<div class="demo-container__sample-links">`,
		`<a href="#storybook" target="_blank" class="sample-links__storybook">Storybook</a>`,
		`<a href="#github" target="_blank" class="sample-links__github">Github</a>`,
	`</div>`,
	`</div>`
].join('')

requestAnimationFrame(() => {
	for (const el of document.querySelectorAll('.storybook-demo')) {
		const style = getComputedStyle(el)
		const content = template.content.cloneNode(true)

		content.querySelector('[src="#preview"]').src = `${metaData.storybookURL}iframe.html?id=${style.getPropertyValue('--StorybookId').trim()}&viewMode=story`
		content.querySelector('[href="#storybook"]').href = `${metaData.storybookURL}?path=/story/${style.getPropertyValue('--StorybookId').trim()}`
		content.querySelector('[href="#github"]').href = `${metaData.repo}/tree/${metaData.branch}/packages/web-components/src/components/${style.getPropertyValue('--GitHubId').trim()}`

		el.append(content)
	}

	for (const formEl of /** @type {HTMLFormElement[]} */ (document.querySelectorAll('form[action="https://rocketcom.us12.list-manage.com/subscribe/post"]'))) {
		formEl.addEventListener('submit', async (event) => {
			// handle the form with javascript, prevent the native handling
			event.preventDefault()

			/** Temporary JSONP name used to intercept response from JSONP. */
			const jsonpName = 'jsonp' + Date.now()

			/** Temporary JSONP global function used to intercept a JSONP response. */
			globalThis[jsonpName] = (response) => {
				delete globalThis[jsonpName]

				// do something with response
				const submitMessage = document.querySelector('#mce-error-response')
				submitMessage.style.display = 'block'
				submitMessage.textContent = response.msg
				console.log(response)
			}

			/** Captured form data as an object. */
			const formData = new FormData(formEl)

			// add some special fields to the data
			formData.append('_', Date.now())
			formData.append('c', jsonpName)

			// inject script to page to temporarily receive JSONP response
			document.head.append(
				Object.assign(
					document.createElement('script'),
					{
						src: formEl.action + '-json?' + new URLSearchParams(formData),
						onload() {
							this.remove()
						}
					}
				)
			)
		})
	}
})
