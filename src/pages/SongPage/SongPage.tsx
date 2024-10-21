import Loading from '../../components/Loading/Loading'
import Tags from '../../components/Tags/Tags'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { getTrack } from '../../store/chart.slice'
import { num_word, validateListeners } from '../../utils/TrackValidation'
import { ITrack } from '../../interfaces/chart.interface'
import s from './SongPage.module.scss'

const SongPage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { isLoading, track } = useSelector((s: RootState) => s.chart)
	const location = useLocation()
	const [searchParams] = useSearchParams()

	useEffect(() => {
		if (location.state) {
			const track = location.state.song as ITrack

			dispatch(
				getTrack({
					artist: track.artist.name,
					name: track.name,
				})
			)
		} else if (searchParams.get('name') && searchParams.get('artist')) {
			dispatch(
				getTrack({
					artist: searchParams.get('artist') as string,
					name: searchParams.get('name') as string,
				})
			)
		}
	}, [dispatch, location.state, searchParams])

	if (isLoading) return <Loading />

	return (
		<>
			{track && (
				<div className={s.wrapper}>
					<div className={s.flex}>
						<div>
							<h1 className={s.name}>{track.name}</h1>
							<p>{track.artist.name}</p>
						</div>
						{track.wiki?.published ? (
							<p className={s.public}>Опубликовано: {track.wiki.published}</p>
						) : (
							''
						)}
					</div>
					<p className={s.listeners}>
						{validateListeners(+track.playcount)}{' '}
						{num_word(+track.playcount, [
							'прослушивания',
							'прослушивания',
							'прослушиваний',
						])}{' '}
						за месяц
					</p>
					<Tags tags={track.toptags.tag} />

					{track.wiki?.content ? (
						<p
							dangerouslySetInnerHTML={{
								__html: track.wiki.content,
							}}
							className={s.content}
						></p>
					) : (
						<p className={s.error}>
							К сожалению, на русском языке в базе данных нет информации об этом
							треке. Попробуйте поискать на другом сайте :(
						</p>
					)}
				</div>
			)}
			{isLoading && <Loading type='full' />}
		</>
	)
}

export default SongPage
