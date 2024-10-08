import { TitleProps } from './Title.props'
import s from './Title.module.scss'

const Title = ({ children }: TitleProps) => {
	return <h2 className={s.title}>{children}</h2>
}

export default Title
