import { TagsProps } from './Tags.props'
import s from './Tags.module.scss'
import { Link } from 'react-router-dom'
import cn from 'classnames'

const Tags = ({ tags }: TagsProps) => {
	return (
		<div className={cn(s.tags)}>
			{tags.map((tag) => (
				<p key={tag.name} className={s.tag}>
					<Link to={tag.url}>{tag.name}</Link>
				</p>
			))}
		</div>
	)
}

export default Tags
