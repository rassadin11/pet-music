import ellipsis from '../../../assets/ellipsis.svg'
import { MusicItemProps } from './MusicItem.props'
import s from '../../TracksTable/TracksTable.module.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { getTrack } from '../../../store/chart.slice'
import { Link } from 'react-router-dom'
import { memo, useState } from 'react'
import { ITrack } from '../../../interfaces/chart.interface'
import { globalActions } from '../../../store/global.slice'
import cn from 'classnames'
import { validateListeners } from '../../../utils/TrackValidation'

const MusicItem = memo(({ item, idx, without }: MusicItemProps) => {
	const dispatch = useDispatch<AppDispatch>()
	// проверяем из сколько столбцов состоит таблица
	const [isThreeColumns] = useState<boolean>(without?.length ? true : false)

	const openModal = (item: ITrack) => {
		dispatch(globalActions.setTrackModal(item))
	}

	const handleOpenModal = () => {
		openModal(item)
		dispatch(getTrack(item))
	}

	return (
		<tr className={s.music}>
			<td>
				<span>{idx + 1}</span>
			</td>
			<td
				className={cn({
					[s.name]: !isThreeColumns,
					[s.bigName]: isThreeColumns,
				})}
			>
				<Link
					to={'/songs/song?name=' + item.name + '&artist=' + item.artist.name}
					state={{ song: item }}
				>
					{item.name}
				</Link>
			</td>

			{Number(without?.findIndex((s) => s == 'artistName')) > -1 ? (
				''
			) : (
				<td
					className={cn({
						[s.artistName]: !isThreeColumns,
						[s.bigArtistName]: isThreeColumns,
					})}
				>
					<Link to={`/musicians/${item.artist.name}`}>{item.artist.name}</Link>
				</td>
			)}

			{Number(without?.findIndex((s) => s == 'listens')) > -1 ? (
				''
			) : (
				<td
					className={cn({
						[s.playcount]: !isThreeColumns,
						[s.bigPlaycount]: isThreeColumns,
					})}
				>
					{validateListeners(item.playcount)}
				</td>
			)}

			<td>
				<img
					src={ellipsis}
					alt='Ellipsis'
					className={s.ellipsis}
					onClick={handleOpenModal}
				/>
			</td>
		</tr>
	)
})

export default MusicItem
