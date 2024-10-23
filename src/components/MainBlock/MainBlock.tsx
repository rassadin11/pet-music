import s from './MainBlock.module.scss'
import musicians from '../../assets/biting_elbows.jpg'
import chart from '../../assets/maneskin.jpg'
import { Link } from 'react-router-dom'

interface IBanner {
	id: number
	title: string
	to: string
	gridColumn: [number, number]
	gridRow: [number, number]
	background: string
}

const initialValue: IBanner[] = [
	{
		id: 1,
		title: 'Музыканты',
		to: '/musicians',
		gridColumn: [1, 3],
		gridRow: [1, 3],
		background: musicians,
	},
	{
		id: 2,
		title: 'Альбомы',
		to: '/albums',
		gridColumn: [3, 4],
		gridRow: [1, 3],
		background: chart,
	},
]

const MainBlock = () => {
	return (
		<div className={s.grid}>
			{initialValue.map((item) => (
				<Link
					to={item.to}
					key={item.id}
					className={s.item}
					style={{
						gridColumn: `${item.gridColumn[0]} / ${item.gridColumn[1]}`,
						gridRow: `${item.gridRow[0]} / ${item.gridRow[1]}`,
						backgroundImage: `url(${item.background})`,
					}}
				>
					<div className={s.content}>{item.title}</div>
				</Link>
			))}
		</div>
	)
}

export default MainBlock
