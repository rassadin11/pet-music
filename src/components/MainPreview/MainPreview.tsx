import Tags from '../Tags/Tags'
import s from './MainPreview.module.scss'
import { MainPreviewProps } from './MainPreview.props'

const MainPreview = ({ img, title, listens, tags }: MainPreviewProps) => {
	return (
		<section className={s.flex}>
			{img ? <img className={s.image} src={img} alt={title} /> : ''}
			<div className={s.info}>
				<h1 className={s.title}>{title}</h1>
				{listens ? <p>{listens}</p> : ''}
				{tags?.length ? <Tags tags={tags} /> : ''}
			</div>
		</section>
	)
}

export default MainPreview
