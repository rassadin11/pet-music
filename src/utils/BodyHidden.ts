export const bodyHidden = (b: boolean) => {
	if (b) {
		document.body.classList.add('hidden')
	} else {
		document.body.classList.remove('hidden')
	}
}