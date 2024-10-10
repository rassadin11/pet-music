import s from './Loading.module.scss'
import { LoadingProps } from './Loading.props'

const Loading = ({ type = 'full' }: LoadingProps) => {
	return (
		<div className={type === 'small' ? s.smallWrapper : s.loaderWrapper}>
			<div className={s.loader}></div>
		</div>
	)
}

export default Loading
