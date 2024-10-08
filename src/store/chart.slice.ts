import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITrack } from './../interfaces/chart.interface';

export const PREFIX = 'http://ws.audioscrobbler.com/2.0/'

interface IChartState {
    track: ITrack[] | null
    chartErrorMessage: string
}

const initialState: IChartState = {
    track: null,
    chartErrorMessage: ''
}

export const getTracks = createAsyncThunk('chart/tracks', async () => {
    try {
        const {data} = await axios.get(PREFIX + '?method=chart.gettoptracks&api_key=14cc9a339ab6c5553aa392ee4278232d&format=json&limit=10')

        return data
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
})

export const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        sortPositionOfTracks: (state) => {
            if (!state.track) return;

            state.track = state.track.map(item => {
                return {...item, listeners: +item.listeners}
            })

            state.track.sort((a, b) => a.listeners > b.listeners ? -1 : 1)
        }
    },
    extraReducers: builder => {
        builder.addCase(getTracks.fulfilled, (state, action) => {
            if (!action.payload) return;
            state.track = action.payload.tracks.track

            chartSlice.caseReducers.sortPositionOfTracks(state)
        })
        
        builder.addCase(getTracks.rejected, (state, action) => {
            if (!action.error.message) return;
            state.chartErrorMessage = action.error.message
        })
    }
})

export default chartSlice.reducer;
export const chartActions = chartSlice.actions

