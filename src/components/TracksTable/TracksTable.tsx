import { memo } from 'react'
import MusicItem from '../ChartBlock/MusicItem/MusicItem'
import s from './TracksTable.module.scss'
import { TracksTableProps } from './TracksTable.props'
import cn from 'classnames'

const TracksTable = memo(({ tracks, without }: TracksTableProps) => {
	if (!tracks.length)
		return <p className={s.error}>There are no info about it :( </p>

	return (
		<table
			className={cn({
				[s.table]: s.table,
				[s.threeColumns]: without?.length,
			})}
		>
			<tbody>
				<tr
					className={cn({
						[s.tableHeaders]: s.tableHeaders,
					})}
				>
					<th>#</th>
					<th>Title</th>
					{Number(without?.findIndex((s) => s == 'artistName')) > -1 ? (
						''
					) : (
						<th>Author</th>
					)}
					{Number(without?.findIndex((s) => s == 'listens')) > -1 ? (
						''
					) : (
						<th>Listens</th>
					)}
				</tr>
				{tracks.map((item, idx) => (
					<MusicItem idx={idx} key={idx} item={item} without={without} />
				))}
			</tbody>
		</table>
	)
})

export default TracksTable
