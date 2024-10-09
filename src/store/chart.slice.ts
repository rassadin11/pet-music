import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITrack } from './../interfaces/chart.interface';

export const PREFIX = 'http://ws.audioscrobbler.com/2.0/'
export const API_KEY = '14cc9a339ab6c5553aa392ee4278232d'

interface IWiki {
    published: string
    summary: string
    content: string
}

interface IChartState {
    tracks: ITrack[] | null
    track: ITrack & {wiki: IWiki} | null
    chartErrorMessage: string
}

const initialState: IChartState = {
    tracks: null,
    track: null,
    chartErrorMessage: ''
}

export const getTracks = createAsyncThunk('chart/tracks', async () => {
    try {
        const {data} = await axios.get(PREFIX + `?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=10`)

        return data
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
})

export const getTrack = createAsyncThunk("chart/track", async ({artist, name}: ITrack) => {
    try {
        const {data} = await axios.get(PREFIX + `?method=track.getInfo&api_key=${API_KEY}&artist=${artist.name}&track=${name}&format=json`)
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
            if (!state.tracks) return;

            state.tracks = state.tracks.map(item => {
                return {...item, playcount: +item.playcount, listeners: +item.listeners}
            })

            state.tracks.sort((a, b) => a.playcount > b.playcount ? -1 : 1)
        },

        clearTrack: (state) => {
            state.track = null
        }
    },
    extraReducers: builder => {
        builder.addCase(getTracks.fulfilled, (state, action) => {
            if (!action.payload) return;
            state.tracks = action.payload.tracks.track

            chartSlice.caseReducers.sortPositionOfTracks(state)
        })
        
        builder.addCase(getTracks.rejected, (state, action) => {
            if (!action.error.message) return;
            state.chartErrorMessage = action.error.message
        })

        builder.addCase(getTrack.fulfilled, (state, action) => {
            if (!action.payload) return;
            state.track = action.payload.track
        })

        builder.addCase(getTrack.rejected, (state, action) => {
            if (!action.error.message) return;
            state.chartErrorMessage = action.error.message
        })
    }
})

export default chartSlice.reducer;
export const chartActions = chartSlice.actions

