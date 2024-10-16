import s from './TrackModal.module.scss'
import cross from '../../assets/cross.svg'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import cn from 'classnames'
import { globalActions } from '../../store/global.slice'
import { chartActions } from '../../store/chart.slice'
import { bodyHidden } from '../../utils/BodyHidden'
import { useEffect } from 'react'
import Loading from '../Loading/Loading'

const TrackModal = () => {
	const dispatch = useDispatch<AppDispatch>()
	// берем информацию о треке, для отображения ее в модальном окне
	// если необходимо получение данном информации, то ждем загрузки
	const { trackModal } = useSelector((s: RootState) => s.global)
	const { track, isLoading } = useSelector((s: RootState) => s.chart)

	const closeModal = () => {
		dispatch(globalActions.setTrackModal(null))

		setTimeout(() => {
			dispatch(chartActions.clearTrack())
		}, 500)
	}

	useEffect(() => {
		bodyHidden(!!trackModal)
	}, [trackModal])

	return (
		<div className={cn(s.modal, trackModal ? s.active : '')}>
			<img src={cross} alt='Закрыть' className={s.cross} onClick={closeModal} />
			{track && (
				<>
					<div className={s.wrapper}>
						{track.album?.image && (
							<img src={track.album.image[1]['#text']} alt='Обложка альбома' />
						)}
						<div className={s.title}>
							<p className={s.trackName}>{track.name}</p>
							<p className={s.artist}>{track.artist.name}</p>
						</div>
					</div>

					<div className={s.item}>
						<p className={s.itemTitle}>Короткое описание</p>
						<p
							className={s.itemSummary}
							dangerouslySetInnerHTML={{
								__html: track.wiki.summary,
							}}
						></p>
					</div>
				</>
			)}
			{isLoading && <Loading type='small' />}
		</div>
	)
}

export default TrackModal
