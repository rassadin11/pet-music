import { createSlice } from '@reduxjs/toolkit';
import { ITrack } from '../interfaces/chart.interface';

interface IGlobalState {
    trackModal: ITrack | null
}

const initialState: IGlobalState = {
    trackModal: null
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setTrackModal: (state, action) => {
            state.trackModal = action.payload
        }
    }
})

export default globalSlice.reducer;
export const globalActions = globalSlice.actions
