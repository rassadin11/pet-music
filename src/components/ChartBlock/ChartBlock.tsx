import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { getTracks } from '../../store/chart.slice'
import Title from '../Title/Title'
import s from './ChartBlock.module.scss'
import MusicItem from './MusicItem/MusicItem'

const ChartBlock = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { tracks, chartErrorMessage, dateOfRequest } = useSelector(
		(s: RootState) => s.chart
	)

	useEffect(() => {
		if (!dateOfRequest) dispatch(getTracks())
		else {
			const date = new Date(
				new Date().valueOf() - new Date(dateOfRequest).valueOf()
			)

			// делаем запрос только если после прошлого запроса прошло 10 минут
			if (date.getTime() / 1000 / 60 > 10) {
				dispatch(getTracks())
			}
		}
	}, [dispatch, dateOfRequest])

	return (
		<div className={s.chart}>
			<Title>Самые популярные песни</Title>
			{tracks ? (
				<table className={s.table}>
					<tbody>
						<tr className={s.tableHeaders}>
							<th>#</th>
							<th>Название</th>
							<th>Автор</th>
							<th>Прослушивания</th>
						</tr>
						{tracks.map((item, idx) => (
							<MusicItem idx={idx} key={idx} item={item} />
						))}
					</tbody>
				</table>
			) : (
				<p>{chartErrorMessage}</p>
			)}
		</div>
	)
}

export default ChartBlock
