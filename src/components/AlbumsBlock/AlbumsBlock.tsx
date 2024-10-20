import AlbumCard from '../AlbumCard/AlbumCard'
import s from './AlbumsBlock.module.scss'
import { AlbumsBlockProps } from './AlbumsBlock.props'

const AlbumsBlock = ({ albums }: AlbumsBlockProps) => {
	if (!albums) return

	return (
		<div className={s.wrapper}>
			{albums.map((item) => (
				<AlbumCard key={item.name} item={item} />
			))}
		</div>
	)
}

export default AlbumsBlock
