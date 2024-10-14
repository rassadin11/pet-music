import { configureStore } from '@reduxjs/toolkit';
import chartSlice from './chart.slice';
import globalSlice from './global.slice';
import musiciansSlice from './musicians.slice';

export const store = configureStore({
    reducer: {
        chart: chartSlice,
        global: globalSlice,
        musicians: musiciansSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch