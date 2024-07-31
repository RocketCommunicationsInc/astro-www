const dialog = document.querySelector('dialog') as HTMLDialogElement
const showButton = document.querySelector('.open') as HTMLButtonElement
const closeButton = document.querySelector('.close') as HTMLButtonElement

// "Show the dialog" button opens the dialog modally
showButton.addEventListener('click', () => {
  dialog.showModal()
})

// "Close" button closes the dialog
closeButton.addEventListener('click', () => {
  dialog.close()
})


