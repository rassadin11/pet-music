import s from './TrackModal.module.scss'
import cross from '../../assets/cross.svg'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import cn from 'classnames'
import { globalActions } from '../../store/global.slice'

const TrackModal = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { trackModal } = useSelector((s: RootState) => s.global)

	const closeModal = () => {
		dispatch(globalActions.setTrackModal(null))
	}

	return (
		<div className={cn(s.modal, trackModal ? s.active : '')}>
			<img src={cross} alt='Cross' className={s.cross} onClick={closeModal} />
			{trackModal && (
				<>
					<p>{trackModal.name}</p>
					<p>{trackModal.duration}</p>
				</>
			)}
		</div>
	)
}

export default TrackModal
