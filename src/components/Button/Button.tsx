import { useNavigate } from 'react-router-dom'
import { ButtonProps } from './Button.props'
import s from './Button.module.scss'
import Skeleton from 'react-loading-skeleton'

const Button = ({
	navigateTo,
	isSkeleton,
	children,
	...props
}: ButtonProps) => {
	const navigate = useNavigate()

	const handleClick = () => {
		if (navigateTo) {
			navigate(navigateTo)
		}
	}

	if (!isSkeleton) {
		return (
			<Skeleton count={1} style={{ width: '163px', padding: '10px 15px' }} />
		)
	}

	return (
		<button onClick={handleClick} {...props} className={s.button}>
			{children}
		</button>
	)
}

export default Button
