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

export const num_word = (value: number, words: string[]) => {  
	value = Math.abs(value) % 100; 
	const num = value % 10;

	if(value > 10 && value < 20) return words[2]; 
	if(num > 1 && num < 5) return words[1];
	if(num == 1) return words[0]; 

	return words[2];
}