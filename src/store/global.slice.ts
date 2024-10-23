import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITrack } from '../interfaces/chart.interface';
import axios from 'axios';
import { API_KEY, PREFIX } from '../constants/server';

interface ISearchTrack {
    name: string,
    artist: string,
    url: string,
    streamable: string,
    listeners: string,
    image: string
}

interface IGlobalState {
    trackModal: ITrack | null
    trackMatches: ISearchTrack[] | null;
    isLoading: boolean;
    searchError: string;
}

export enum TypeOfTrackMatches {
    ADD = 'add',
    CLEAR = 'clear'
}

const initialState: IGlobalState = {
    trackModal: null,
    trackMatches: null,
    isLoading: false,
    searchError: ''
}

export const searchTrackByInput = createAsyncThunk('global/search', async (value: string) => {
    try {
        const {data} = await axios.get(PREFIX + `?method=track.search&track=${value}&api_key=${API_KEY}&format=json&limit=10`)
        return data;
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
})

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setTrackModal: (state, action) => {
            state.trackModal = action.payload
        },
        resetSearch: (state) => {
            state.trackMatches = null
        } 
    },
    extraReducers: builder => {
        builder.addCase(searchTrackByInput.fulfilled, (state, action) => {
            state.isLoading = false
            if (!action.payload) return;
            state.trackMatches = action.payload.results.trackmatches.track;
        })

        builder.addCase(searchTrackByInput.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(searchTrackByInput.rejected, (state, action) => {
            state.isLoading = false
            if (!action.error.message) return;
            state.searchError = action.error.message
        })
    }
})

export default globalSlice.reducer;
export const globalActions = globalSlice.actions
