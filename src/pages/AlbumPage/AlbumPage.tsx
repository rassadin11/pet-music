import { useDispatch, useSelector } from 'react-redux'
import s from './AlbumPage.module.scss'
import { AppDispatch, RootState } from '../../store/store'
import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { getAlbumByName } from '../../store/albums.slice'
import Loading from '../../components/Loading/Loading'
import MainPreview from '../../components/MainPreview/MainPreview'
import TracksTable from '../../components/TracksTable/TracksTable'

const AlbumPage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { activeAlbum, isLoading } = useSelector((s: RootState) => s.albums)
	const { state } = useLocation()
	const [searchParams] = useSearchParams()

	useEffect(() => {
		const isExist =
			activeAlbum?.name.toLowerCase() === state?.name.toLowerCase() ||
			activeAlbum?.name.toLowerCase() ===
				(searchParams.get('name') as string).toLowerCase()

		if (activeAlbum?.name && isExist) return

		if (state && state.name && state.artist) {
			dispatch(
				getAlbumByName({
					name: state.name,
					artist: state.artist,
				})
			)
		} else if (searchParams.get('name') && searchParams.get('artist')) {
			dispatch(
				getAlbumByName({
					name: searchParams.get('name') as string,
					artist: searchParams.get('artist') as string,
				})
			)
		}
	}, [activeAlbum, dispatch, state, searchParams])

	if (isLoading) return <Loading />
	if (!activeAlbum) return <p>error</p>

	return (
		<>
			<MainPreview
				title={activeAlbum.name}
				img={activeAlbum.image?.[2]['#text']}
				tags={activeAlbum.tags.tag}
			/>
			<section className={s.tracks}>
				<TracksTable
					tracks={
						Array.isArray(activeAlbum.tracks.track)
							? activeAlbum.tracks.track
							: [activeAlbum.tracks.track]
					}
					without={['listens']}
				/>
			</section>
		</>
	)
}

export default AlbumPage
