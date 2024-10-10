import { TagsProps } from './Tags.props'
import s from './Tags.module.scss'
import { Link } from 'react-router-dom'

const Tags = ({ tags }: TagsProps) => {
	return (
		<div className={s.tags}>
			{tags.map((tag) => (
				<p key={tag.name} className={s.tag}>
					<Link to={tag.url}>{tag.name}</Link>
				</p>
			))}
		</div>
	)
}

export default Tags
