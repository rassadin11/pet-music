import { forwardRef } from 'react'
import { InputProps } from './Input.props'

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ value, setValue, placeholder, type, ...props }, ref) => {
		return (
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				ref={ref}
				onChange={(e) => setValue(e.target.value)}
				{...props}
			/>
		)
	}
)

export default Input
