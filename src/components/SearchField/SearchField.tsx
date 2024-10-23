import { useEffect, useState } from 'react'
import s from './SearchField.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { globalActions, searchTrackByInput } from '../../store/global.slice'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import cn from 'classnames'

const SearchField = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { trackMatches, isLoading } = useSelector((s: RootState) => s.global)
	const [value, setValue] = useState<string>('')

	const resetValue = () => {
		setValue('')
		dispatch(globalActions.resetSearch())
	}

	useEffect(() => {
		if (value) {
			dispatch(searchTrackByInput(value))
		}
	}, [dispatch, value])

	return (
		<div className={s.searchWrapper}>
			<div className={s.search}>
				<input
					type='text'
					placeholder='Введите название трека'
					className={cn(
						s.input,
						trackMatches?.length && value.length ? s.noBorder : ''
					)}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>

				<div className={s.results}>
					{trackMatches?.length && value.length > 0 && (
						<>
							{trackMatches.map((track) => (
								<Link
									to={
										'/songs/song?name=' + track.name + '&artist=' + track.artist
									}
									key={track.url}
									className={s.result}
									onClick={resetValue}
								>
									<p className={s.name}>{track.name}</p>
									<p className={s.artist}>{track.artist}</p>
								</Link>
							))}
						</>
					)}
					{isLoading ? (
						<div className={s.results}>
							<Loading type='small' />
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	)
}

export default SearchField
