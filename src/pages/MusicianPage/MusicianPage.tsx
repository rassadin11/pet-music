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

const MusicianPage = () => {
	const dispatch = useDispatch<AppDispatch>()

	// музыкант, которого необходимо отобразить
	const { authorName } = useParams()
	// полная информацию о нём
	const activeMusician = useSelector(
		(s: RootState) => s.musicians.activeMusician
	)

	// количество слушателей
	const [listens, setListens] = useState<string | number>(
		activeMusician?.stats.listeners || ''
	)

	// текст для отображения кол-во слушателей в правильном падеже
	const [listensText, setListensText] = useState<string>(
		activeMusician
			? num_word(+activeMusician.stats.listeners, [
					'прослушивания',
					'прослушивания',
					'прослушиваний',
			  ])
			: ''
	)

	useEffect(() => {
		if (!listens && activeMusician) {
			setListens(validateListeners(activeMusician.stats.listeners))
			setListensText(
				num_word(+activeMusician.stats.listeners, [
					'прослушивания',
					'прослушивания',
					'прослушиваний',
				])
			)
		}

		if (!activeMusician?.toptracks?.length && authorName) {
			dispatch(getTracksByMusician({ name: authorName }))
		}

		if (activeMusician) return

		if (authorName && activeMusician === null)
			dispatch(getMusicianInfo({ name: authorName }))
	}, [activeMusician, authorName, listens, dispatch])

	if (!activeMusician) return <Loading />

	return (
		<section className={s.musician}>
			<h1>{activeMusician.name}</h1>
			<p>
				{listens} {listensText}
			</p>
			{activeMusician.toptracks && (
				<TracksTable
					tracks={activeMusician.toptracks}
					without={['artistName']}
				/>
			)}
		</section>
	)
}

export default MusicianPage
