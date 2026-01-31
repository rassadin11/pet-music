import {configureStore} from '@reduxjs/toolkit'
import chartSlice from './chart/chart.slice'
import globalSlice from './global/global.slice'
import musiciansSlice from './musicians/musicians.slice'
import albumsSlice from './albums/albums.slice'

export const store = configureStore({
  reducer: {
    chart: chartSlice,
    global: globalSlice,
    musicians: musiciansSlice,
    albums: albumsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
