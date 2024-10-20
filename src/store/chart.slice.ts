import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IChartState, ITrack } from './../interfaces/chart.interface';
import Typograf from 'typograf';
import { API_KEY, PREFIX } from '../constants/server';


const initialState: IChartState = {
    tracks: null,
    track: null,
    isLoading: false,
    dateOfRequest: null,
    chartErrorMessage: ''
}

export const getTracks = createAsyncThunk('chart/tracks', async () => {
    try {
        const {data} = await axios.get(PREFIX + `?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=10&lang=ru`)

        return data
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
})

export const getTrack = createAsyncThunk("chart/track", async ({artist, name}: ITrack) => {
    try {
        const {data} = await axios.get(PREFIX + `?method=track.getInfo&api_key=${API_KEY}&artist=${artist.name}&track=${name}&format=json&lang=ru`)
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
        },

        typographTrack: (state) => {
            if (!state.track) return;

            const typ = new Typograf({locale: ['ru', 'en-US']});
            state.track.wiki.content = typ.execute(state.track.wiki.content)
            state.track.wiki.summary = typ.execute(state.track.wiki.summary)
        }
    },
    extraReducers: builder => {
        builder.addCase(getTracks.fulfilled, (state, action) => {
            state.isLoading = false
            if (!action.payload) return;
            state.tracks = action.payload.tracks.track
            state.dateOfRequest = new Date().getTime();
            console.log('changed date request time')

            chartSlice.caseReducers.sortPositionOfTracks(state)
        })

        builder.addCase(getTracks.pending, (state) => {
            state.isLoading = true
        })
        
        builder.addCase(getTracks.rejected, (state, action) => {
            state.isLoading = false
            if (!action.error.message) return;
            state.chartErrorMessage = action.error.message
        })

        builder.addCase(getTrack.fulfilled, (state, action) => {
            if (!action.payload) return;
            state.track = action.payload.track
            
            state.isLoading = false
            chartSlice.caseReducers.typographTrack(state)
        })

        builder.addCase(getTrack.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getTrack.rejected, (state, action) => {
            if (!action.error.message) return;
            state.chartErrorMessage = action.error.message
            state.isLoading = false
        })
    }
})

export default chartSlice.reducer;
export const chartActions = chartSlice.actions
