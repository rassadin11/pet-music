import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
	getMusicianInfo,
	getTracksByMusician,
} from '../../store/musicians.slice'
import s from './MusicianPage.module.scss'
import Loading from '../../components/Loading/Loading'
import { num_word, validateListeners } from '../../utils/TrackValidation'
import TracksTable from '../../components/TracksTable/TracksTable'
import MusicianIntro from '../../components/MusicianIntro/MusicianIntro'
import AlbumsBlock from '../../components/AlbumsBlock/AlbumsBlock'
import { IFullAlbum } from '../../interfaces/albums.interface'
import { IAlbum } from '../../interfaces/chart.interface'
import MainPreview from '../../components/MainPreview/MainPreview'

const MusicianPage = () => {
	const dispatch = useDispatch<AppDispatch>()

	// музыкант, которого необходимо отобразить
	const { authorName } = useParams()
	// полная информацию о нём
	const activeMusician = useSelector(
		(s: RootState) => s.musicians.activeMusician
	)

	// количество слушателей
	const [listens, setListens] = useState<string | number>('')
	// текст для отображения кол-во слушателей в правильном падеже
	const [listensText, setListensText] = useState<string>('')

	useEffect(() => {
		if (
			!authorName ||
			(activeMusician?.name.toLowerCase() === authorName.toLowerCase() &&
				activeMusician?.toptracks)
		)
			return

		if (
			!activeMusician ||
			activeMusician.name.toLowerCase() !== authorName.toLowerCase()
		) {
			dispatch(getMusicianInfo({ name: authorName }))
			dispatch(getTracksByMusician({ name: authorName }))
		} else if (
			!activeMusician.toptracks?.[0] ||
			activeMusician.name.toLowerCase() !== authorName.toLowerCase()
		) {
			dispatch(getTracksByMusician({ name: authorName }))
		}
	}, [activeMusician, authorName, listens, dispatch])

	useEffect(() => {
		setListens(validateListeners(activeMusician?.stats?.listeners || 0))

		setListensText(
			num_word(+(activeMusician?.stats?.listeners || 0), [
				'listens per month',
				'listens per month',
				'listens per month',
			])
		)
	}, [activeMusician?.stats?.listeners])

	if (
		!activeMusician ||
		activeMusician.name.toLowerCase() !== authorName?.toLowerCase()
	)
		return <Loading />

	const modifyAlbums = (item: IAlbum): IFullAlbum => {
		return {
			url: item.uri,
			name: item.name,
			image: item.image,
			mbid: '',
			artist: {
				name: activeMusician.name,
				url: activeMusician.url,
				mbid: activeMusician.mbid,
			},
		}
	}

	const getImage = () => {
		if (document.body.clientWidth > 768) {
			return activeMusician.albums?.[0]?.image?.[2]['#text']
		}

		return
	}

	return (
		<section className={s.musician}>
			<MainPreview
				img={getImage()}
				title={activeMusician.name}
				listens={`${listens} ${listensText}`}
				tags={activeMusician.tags.tag}
			/>

			<section>
				<h2 className={s.title}>Popular songs</h2>
				<div className={s.tableWrapper}>
					{activeMusician.toptracks && (
						<TracksTable
							tracks={activeMusician.toptracks}
							without={['artistName']}
						/>
					)}
				</div>
			</section>

			<section>
				<h2 className={s.title}>Albums</h2>
				<AlbumsBlock albums={activeMusician.albums?.map(modifyAlbums)} />
			</section>

			<section>
				<h2 className={s.title}>Similar musicians</h2>
				<div className={s.similar}>
					<MusicianIntro items={activeMusician.similar.artist} />
				</div>
			</section>

			<section>
				<h2 className={s.title}>Artist in detail</h2>
				<p
					dangerouslySetInnerHTML={{
						__html: activeMusician.bio.content,
					}}
					className={s.description}
				></p>
			</section>
		</section>
	)
}

export default MusicianPage
