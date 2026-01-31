import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_KEY, PREFIX} from '../../constants/server'

export const searchTrackByInput = createAsyncThunk(
  'global/tracksearch',
  async (value: string) => {
    try {
      const {data} = await axios.get(
        PREFIX +
          `?method=track.search&track=${value}&api_key=${API_KEY}&format=json&limit=10`,
      )
      return data
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)

export const searchArtistByInput = createAsyncThunk(
  'global/artistsearch',
  async (name: string) => {
    try {
      const {data} = await axios.get(
        PREFIX +
          `?method=artist.search&artist=${name}&api_key=${API_KEY}&format=json&limit=10`,
      )
      return data
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)
