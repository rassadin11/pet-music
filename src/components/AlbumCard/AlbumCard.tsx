import { AlbumCardProps } from './AlbumCard.props'
import s from './AlbumCard.module.scss'
import { Link } from 'react-router-dom'
import cn from 'classnames'

const AlbumCard = ({ item }: AlbumCardProps) => {
	return (
		<Link
			to={
				'/albums/album?name=' +
				item.name.toLowerCase() +
				'&artist=' +
				item.artist.name
			}
			state={{ name: item.name, artist: item.artist.name }}
			className={s.card}
		>
			{item.image?.[2]['#text'] ? (
				<div className={s.imageWrapper}>
					<img loading='lazy' src={item.image?.[2]['#text']} alt={item.name} />
				</div>
			) : (
				<div className={cn(s.imageWrapper, s.emptyImage)}>
					<p className={s.emptyText}>No image</p>
				</div>
			)}
			<p className={s.album}>{item.name}</p>
			<p className={s.artist}>{item.artist.name}</p>
		</Link>
	)
}

export default AlbumCard
