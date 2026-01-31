import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_KEY, PREFIX} from '../../constants/server'

export const getPopularTags = createAsyncThunk(
  'albums/tags',
  async () => {
    try {
      const {data} = await axios.get(
        PREFIX +
          `?method=album.gettoptags&artist=radiohead&album=the%20bends&api_key=${API_KEY}&format=json`,
      )
      return data
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)

export const getPopularTracksByTag = createAsyncThunk(
  'albums/tracks',
  async (tag: string) => {
    try {
      const {data} = await axios.get(
        PREFIX +
          `?method=tag.gettopalbums&tag=${tag}&api_key=${API_KEY}&format=json`,
      )
      return data
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)

export const getAlbumByName = createAsyncThunk(
  'albums/track',
  async ({name, artist}: {name: string; artist: string}) => {
    try {
      const {data} = await axios.get(
        PREFIX +
          `?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${name}&format=json`,
      )
      return data
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)
