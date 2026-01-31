import axios from 'axios'
import {API_KEY, PREFIX} from '../../constants/server'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {IArtist, ITrack} from '../../interfaces/chart.interface'

export const getTracks = createAsyncThunk(
  'chart/tracks',
  async () => {
    try {
      const {data} = await axios.get(
        PREFIX +
          `?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=10`,
      )

      return data
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)

function isString(artist: IArtist | string): artist is IArtist {
  return (artist as IArtist).name !== undefined
}

export const getTrack = createAsyncThunk(
  'chart/track',
  async ({artist, name}: {artist: string; name: string} | ITrack) => {
    try {
      if (isString(artist)) {
        const {data} = await axios.get(
          PREFIX +
            `?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${name}&format=json`,
        )
        return data
      } else {
        const {data} = await axios.get(
          PREFIX +
            `?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${name}&format=json`,
        )
        return data
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)
