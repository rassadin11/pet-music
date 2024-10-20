import { useDispatch, useSelector } from 'react-redux'
import s from './AlbumPage.module.scss'
import { AppDispatch, RootState } from '../../store/store'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getAlbumByName } from '../../store/albums.slice'
import Loading from '../../components/Loading/Loading'
import MainPreview from '../../components/MainPreview/MainPreview'

const AlbumPage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { activeAlbum } = useSelector((s: RootState) => s.albums)
	const { state } = useLocation()

	useEffect(() => {
		if (activeAlbum?.name === state.name) return

		if (!activeAlbum) {
			dispatch(
				getAlbumByName({
					name: state.name,
					artist: state.artist,
				})
			)
		}
	}, [activeAlbum, dispatch, state.artist, state.name])

	if (!activeAlbum) return <Loading />

	return (
		<div className={s.wrapper}>
			<MainPreview
				title={activeAlbum.name}
				img={activeAlbum.image?.[2]['#text']}
				tags={activeAlbum.tags.tag}
			/>
		</div>
	)
}

export default AlbumPage
