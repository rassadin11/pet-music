import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { getPopularTags, getPopularTracksByTag } from '../../store/albums.slice'
import Title from '../../components/Title/Title'
import Loading from '../../components/Loading/Loading'
import AlbumsBlock from '../../components/AlbumsBlock/AlbumsBlock'

const AlbumsPage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { albums, tags } = useSelector((s: RootState) => s.albums)

	useEffect(() => {
		if (!tags.length) {
			dispatch(getPopularTags())
		} else if (!albums.length) {
			dispatch(getPopularTracksByTag(tags[0].name))
		}
	}, [dispatch, tags, albums])

	if (!albums.length) {
		return <Loading />
	}

	return (
		<div>
			<Title>Самые популярные альбомы</Title>
			<AlbumsBlock albums={albums} />
		</div>
	)
}

export default AlbumsPage
