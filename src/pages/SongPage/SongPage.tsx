import { useLocation } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { getTrack } from '../../store/chart.slice'
import s from './SongPage.module.scss'
import Tags from '../../components/Tags/Tags'
import { num_word, validateListeners } from '../../utils/TrackValidation'

const SongPage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { isLoading, track } = useSelector((s: RootState) => s.chart)
	const location = useLocation()

	useEffect(() => {
		dispatch(getTrack(location.state.song))
	}, [dispatch, location.state.song])

	return (
		<>
			{track && (
				<div className={s.wrapper}>
					<div className={s.flex}>
						<div>
							<h1 className={s.name}>{track.name}</h1>
							<p>{track.artist.name}</p>
						</div>
						<p className={s.public}>Опубликовано: {track.wiki.published}</p>
					</div>
					<p className={s.listeners}>
						{validateListeners(+track.listeners)}{' '}
						{num_word(+track.listeners, [
							'слушатель',
							'слушателя',
							'слушателей',
						])}{' '}
						за месяц
					</p>
					<Tags tags={track.toptags.tag} />

					<p
						dangerouslySetInnerHTML={{ __html: track.wiki.content }}
						className={s.content}
					></p>
				</div>
			)}
			{isLoading && <Loading type='full' />}
		</>
	)
}

export default SongPage
