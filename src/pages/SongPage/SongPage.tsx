import { useLocation } from 'react-router-dom'
import { ITrack } from '../../interfaces/chart.interface'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY, PREFIX } from '../../store/chart.slice'

const SongPage = () => {
	const [track, setTrack] = useState<ITrack>()
	const [loading, setLoading] = useState<boolean>(false)
	const location = useLocation()
	const song: ITrack = location.state.song

	useEffect(() => {
		const getTrack = async () => {
			try {
				setLoading(true)
				const { data } = await axios.get(
					PREFIX +
						`?method=track.getInfo&api_key=${API_KEY}&artist=${song.artist.name}&track=${song.name}&format=json`
				)

				setTrack(data.track)
				setLoading(false)
			} catch (e) {
				if (e instanceof Error) {
					throw new Error(e.message)
				}

				setLoading(false)
			}
		}

		getTrack()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{track && (
				<div>
					<h1>{track.name}</h1>
					<p>{track.artist.name}</p>
				</div>
			)}
			{loading && <p>Loading...</p>}
		</>
	)
}

export default SongPage
