import { num_word, validateListeners } from '../../utils/TrackValidation'
import { ArtistCardProps } from './ArtistCard.props'
import s from './ArtistCard.module.scss'
import Button from '../Button/Button'
import Skeleton from 'react-loading-skeleton'

const ArtistCard = ({ item }: ArtistCardProps) => {
	// анализируем и генерируем информацию для отображения
	const backgroundImage = item.detInfo?.albums?.[0]?.image?.[3]?.['#text'] || ''
	const bioContent = item.detInfo?.info?.bio?.content || ''
	const listenersText = validateListeners(item.playcount)
	const listenersCount = num_word(+item.playcount, [
		'listens per month',
		'listens per month',
		'listens per month',
	])

	return (
		<div className={s.main}>
			{backgroundImage ? (
				<div
					className={s.image}
					style={{
						backgroundImage: `url(${backgroundImage})`,
					}}
				/>
			) : (
				<div className={s.image}>
					<Skeleton count={1} style={{ height: '100%' }} />
				</div>
			)}
			<div className={s.textContent}>
				<h2 className={s.title}>
					{item.name ? item.name : <Skeleton count={1} />}
				</h2>
				<p className={s.listeners}>
					{listenersText ? (
						`${listenersText} ${listenersCount}`
					) : (
						<Skeleton count={1} />
					)}
				</p>
				<p className={s.info}>
					{bioContent ? `${bioContent}` : <Skeleton count={6} />}
				</p>

				<div className={s.link}>
					<Button
						navigateTo={'/musicians/' + item.name}
						isSkeleton={!!bioContent}
					>
						Learn more
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ArtistCard
