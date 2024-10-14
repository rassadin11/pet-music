import { useNavigate } from 'react-router-dom'
import { ButtonProps } from './Button.props'
import s from './Button.module.scss'

const Button = ({ navigateTo, children, ...props }: ButtonProps) => {
	const navigate = useNavigate()

	const handleClick = () => {
		if (navigateTo) {
			navigate(navigateTo)
		}
	}

	return (
		<button onClick={handleClick} {...props} className={s.button}>
			{children}
		</button>
	)
}

export default Button
