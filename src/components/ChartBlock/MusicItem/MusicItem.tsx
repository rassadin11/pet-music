import ellipsis from '../../../assets/ellipsis.svg'
import { MusicItemProps } from './MusicItem.props'
import s from '../ChartBlock.module.scss'
import { validateListeners } from '../../../utils/TrackValidation'

const MusicItem = ({ item, openModal, idx }: MusicItemProps) => {
	return (
		<tr className={s.music}>
			<td>
				<span>{idx + 1}</span>
			</td>
			<td className={s.name}>
				<p>{item.name}</p>
			</td>

			<td>{item.artist.name}</td>
			<td>{validateListeners(item.listeners)}</td>
			<td>
				<img
					src={ellipsis}
					alt='Ellipsis'
					className={s.ellipsis}
					onClick={() => openModal(item)}
				/>
			</td>
		</tr>
	)
}

export default MusicItem
