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
				const submitMessage = document.querySelector("#mce-responses")
				submitMessage.style.display = "block"
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
