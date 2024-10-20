import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { getMusicians } from '../../store/musicians.slice'
import Title from '../../components/Title/Title'
import MusicianIntro from '../../components/MusicianIntro/MusicianIntro'

const MusiciansPage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { musicians } = useSelector((s: RootState) => s.musicians)

	// получаем топ-50 самых популярных исполнителей
	useEffect(() => {
		if (musicians.length < 50) {
			dispatch(getMusicians(50))
		}
	}, [dispatch, musicians.length])

	return (
		<div>
			<Title>Выбери своего любимого музыканта!</Title>
			{musicians.length > 0 && <MusicianIntro items={musicians} />}
		</div>
	)
}

export default MusiciansPage
