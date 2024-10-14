import { num_word, validateListeners } from '../../utils/TrackValidation'
import { ArtistCardProps } from './ArtistCard.props'
import s from './ArtistCard.module.scss'
import Button from '../Button/Button'

const ArtistCard = ({ item }: ArtistCardProps) => {
	const backgroundImage = item.detInfo?.albums?.[0]?.image?.[3]?.['#text'] || ''
	const bioContent = item.detInfo?.info?.bio?.content || ''
	const listenersText = validateListeners(item.playcount)
	const listenersCount = num_word(+item.playcount, [
		'прослушивания',
		'прослушивания',
		'прослушиваний',
	])

	return (
		<div className={s.main}>
			{backgroundImage && (
				<div
					className={s.image}
					style={{
						backgroundImage: `url(${backgroundImage})`,
					}}
				/>
			)}
			<div className={s.textContent}>
				<h2 className={s.title}>{item.name}</h2>
				<p className={s.listeners}>
					{listenersText} {listenersCount}
				</p>
				<p className={s.info}>{bioContent}</p>

				<div className={s.link}>
					<Button navigateTo='/'>Узнать подробнее</Button>
				</div>
			</div>
		</div>
	)
}

export default ArtistCard
