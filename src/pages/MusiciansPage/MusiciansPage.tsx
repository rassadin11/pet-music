import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { getMusicians } from '../../store/musicians.slice'
import s from './MusiciansPage.module.scss'
import Title from '../../components/Title/Title'
import { validateListeners } from '../../utils/TrackValidation'
import { Link } from 'react-router-dom'

const MusiciansPage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { musicians } = useSelector((s: RootState) => s.musicians)

	// получаем топ-50 самых популярных исполнителей
	useEffect(() => {
		dispatch(getMusicians(50))
	}, [dispatch])

	return (
		<div>
			<Title>Выбери своего любимого музыканта!</Title>
			<div className={s.wrapper}>
				{musicians.length > 0 &&
					musicians.map((m) => (
						<Link key={m.name} to={'/musicians/' + m.name} className={s.artist}>
							<p>{m.name}</p>
							<p className={s.listeners}>
								{validateListeners(m.listeners)} слуш.
							</p>
						</Link>
					))}
			</div>
		</div>
	)
}

export default MusiciansPage
