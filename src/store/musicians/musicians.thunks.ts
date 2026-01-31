import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_KEY, PREFIX} from '../../constants/server'

// получаем музыкантов
export const getMusicians = createAsyncThunk(
  'musicians/artists',
  async (limit: number) => {
    try {
      const {data} = await axios.get(
        PREFIX +
          `?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}`,
      )
      return data
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)

// получаем информацию об артисте и его самом популярном альбоме (для отображения в слайдере обложки данного альбома)
export const getArtistInfoAndAlbum = createAsyncThunk(
  'musicians/albums',
  async ({name, limit}: {name: string; limit: number}) => {
    try {
      const res1 = await axios.get(
        PREFIX +
          `?method=artist.gettopalbums&artist=${name}&api_key=${API_KEY}&format=json&limit=${limit}`,
      )
      const res2 = await axios.get(
        PREFIX +
          `?method=artist.getinfo&artist=${name}&api_key=${API_KEY}&format=json`,
      )
      return {data: res1.data, info: res2.data, name}
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)

// получаем ту же информацию, что и выше, но обрабатываем по-другому (нужно для страницы конкретного исполнителя)
export const getMusicianInfo = createAsyncThunk(
  'musicians/musician',
  async ({name}: {name: string}) => {
    try {
      const res1 = await axios.get(
        PREFIX +
          `?method=artist.gettopalbums&artist=${name}&api_key=${API_KEY}&format=json&limit=5`,
      )
      const res2 = await axios.get(
        PREFIX +
          `?method=artist.getinfo&artist=${name}&api_key=${API_KEY}&format=json`,
      )

      return {data: res1.data, info: res2.data}
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)

// получаем треки артиста
export const getTracksByMusician = createAsyncThunk(
  'musicians/tracksByMusician',
  async ({name}: {name: string}) => {
    try {
      const {data} = await axios.get(
        PREFIX +
          `?method=artist.gettoptracks&artist=${name}&api_key=${API_KEY}&format=json&limit=5`,
      )
      return data
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  },
)
