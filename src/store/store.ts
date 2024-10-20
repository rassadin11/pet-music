import { configureStore } from '@reduxjs/toolkit';
import chartSlice from './chart.slice';
import globalSlice from './global.slice';
import musiciansSlice from './musicians.slice';
import albumsSlice from './albums.slice';

export const store = configureStore({
    reducer: {
        chart: chartSlice,
        global: globalSlice,
        musicians: musiciansSlice,
        albums: albumsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch