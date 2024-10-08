import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { getTracks } from '../../store/chart.slice'
import Title from '../Title/Title'
import s from './ChartBlock.module.scss'
import { ITrack } from '../../interfaces/chart.interface'
import MusicItem from './MusicItem/MusicItem'
import { globalActions } from '../../store/global.slice'

const ChartBlock = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { track, chartErrorMessage } = useSelector((s: RootState) => s.chart)

	useEffect(() => {
		dispatch(getTracks())
	}, [dispatch])

	const openModal = (item: ITrack) => {
		dispatch(globalActions.setTrackModal(item))
	}

	return (
		<div className={s.chart}>
			<Title>Самые популярные песни</Title>
			{track ? (
				<table className={s.table}>
					<tbody>
						<tr className={s.tableHeaders}>
							<th>#</th>
							<th>Название</th>
							<th>Автор</th>
							<th>Слушатели</th>
						</tr>
						{track.map((item, idx) => (
							<MusicItem
								key={idx}
								item={item}
								idx={idx}
								openModal={openModal}
							/>
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
