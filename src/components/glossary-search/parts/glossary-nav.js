 // Find our component DOM on the page.
 const navButtons = document.querySelectorAll('.p-glossary-nav-button')

 // Add event listeners to fire confetti when a button is clicked.
 navButtons.forEach((button) => {
   button.addEventListener('click', (event) => handleClick(event))
 })

const handleClick = (event) => {
	navButtons.forEach(button => button.classList.remove('selected'))

	const button = event.target
	const { height } = document.querySelector('.p-glossary-search').getBoundingClientRect()
	const { x, y } = document.querySelector(`h2#${button.id}`).getBoundingClientRect()

	button.classList.add('selected')
	window.scrollBy(x, y - height)
}
// const useClick = {
// 	on(element) {
// 		element.addEventListener('keydown', this)
// 		element.addEventListener('keyup', this)
// 	},
// 	handleEvent(event) {
// 		switch (event.key) {
// 			case event.type === 'keydown' && 'Enter':
// 				event.target.click()

// 			case ' ':
// 				event.preventDefault()

// 				if (!event.altKey && event.type === 'keyup') {
// 					event.target.click()
// 				}
// 		}
// 	},
// }
