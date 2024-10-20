import { TitleProps } from './Title.props'
import s from './Title.module.scss'
import cn from 'classnames'

const Title = ({ children, ...props }: TitleProps) => {
	return (
		<h2 className={cn(s.title, props.className ? props.className : '')}>
			{children}
		</h2>
	)
}

export default Title
