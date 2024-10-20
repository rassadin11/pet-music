import { AlbumCardProps } from './AlbumCard.props'
import s from './AlbumCard.module.scss'
import { Link } from 'react-router-dom'

const AlbumCard = ({ item }: AlbumCardProps) => {
	return (
		<Link
			to={'/albums/' + item.name}
			state={{ name: item.name, artist: item.artist.name }}
			className={s.card}
		>
			<div className={s.imageWrapper}>
				<img src={item.image?.[2]['#text']} alt={item.name} />
			</div>
			<p className={s.album}>{item.name}</p>
			<p className={s.artist}>{item.artist.name}</p>
		</Link>
	)
}

export default AlbumCard