export const validateListeners = (listeners: string | number): string => {
	const arr = String(listeners).split('')
	let result = ''

	arr.reverse().forEach((i, idx) => {
		if ((idx + 1) % 3 === 0 && arr.length !== idx - 1) {
			result = ' ' + i + result;
		} else {
			result = i + result;
		}
	})

	return result
}