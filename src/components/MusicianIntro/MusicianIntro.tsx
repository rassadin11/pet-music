import { Link } from 'react-router-dom'
import s from './MusicianIntro.module.scss'
import { MusicianIntroProps } from './MusicianIntro.props'
import { validateListeners } from '../../utils/TrackValidation'
import { IMusician } from '../../interfaces/musicians.interface'
import { IArtist } from '../../interfaces/chart.interface'

function isArtist(item: IMusician | IArtist): item is IArtist {
	return (item as IArtist).name !== undefined
}

const MusicianIntro = ({ items }: MusicianIntroProps) => {
	return (
		<div className={s.wrapper}>
			{items.map((item) => (
				<Link
					key={item.name}
					to={'/musicians/' + item.name}
					className={s.artist}
				>
					<p>{item.name}</p>
					{isArtist(item) ? (
						''
					) : (
						<p className={s.listeners}>
							{validateListeners(item.listeners)} слуш.
						</p>
					)}
				</Link>
			))}
		</div>
	)
}

export default MusicianIntro
