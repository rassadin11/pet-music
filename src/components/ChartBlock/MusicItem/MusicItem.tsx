import ellipsis from '../../../assets/ellipsis.svg'
import { MusicItemProps } from './MusicItem.props'
import s from '../ChartBlock.module.scss'
import { validateListeners } from '../../../utils/TrackValidation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { getTrack } from '../../../store/chart.slice'
import { Link } from 'react-router-dom'

const MusicItem = ({ item, openModal, idx }: MusicItemProps) => {
	const dispatch = useDispatch<AppDispatch>()

	const handleOpenModal = () => {
		openModal(item)
		dispatch(getTrack(item))
	}

	return (
		<tr className={s.music}>
			<td>
				<span>{idx + 1}</span>
			</td>
			<td className={s.name}>
				<Link to='songs/song' state={{ song: item }}>
					{item.name}
				</Link>
			</td>

			<td>{item.artist.name}</td>
			<td>{validateListeners(item.playcount)}</td>
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
}

export default MusicItem
