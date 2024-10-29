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

interface IArtistSearch {
    name: string,
    mbid: string,
    url: string,
    image_small: string,
    image: string,
    streamable: string | number
    listeners: string,
}

interface IGlobalState {
    trackModal: ITrack | null
    trackMatches: ISearchTrack[] | null;
    artistMatches: IArtistSearch[] | null;
    isLoading: boolean;
    searchError: string;
    scrollBarWidth: number;
}

export enum TypeOfTrackMatches {
    ADD = 'add',
    CLEAR = 'clear'
}

const initialState: IGlobalState = {
    trackModal: null,
    trackMatches: null,
    artistMatches: null,
    isLoading: false,
    scrollBarWidth: 0,
    searchError: ''
}

export const searchTrackByInput = createAsyncThunk('global/tracksearch', async (value: string) => {
    try {
        const {data} = await axios.get(PREFIX + `?method=track.search&track=${value}&api_key=${API_KEY}&format=json&limit=10`)
        return data;
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
})

export const searchArtistByInput = createAsyncThunk('global/artistsearch', async (name: string) => {
    try {
        const {data} = await axios.get(PREFIX + `?method=artist.search&artist=${name}&api_key=${API_KEY}&format=json&limit=10`)
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
        },
        resetArtistSearch: (state) => {
            state.artistMatches = null
        },
        countScrollBarWidth: (state) => {
            const div = document.createElement('div');
            div.style.visibility = 'hidden';
            div.style.overflow = 'scroll';
            div.style.width = '100px';
            div.style.height = '100px';

            document.body.appendChild(div);
            const scrollbarWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);
            state.scrollBarWidth = scrollbarWidth;
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
        
        builder.addCase(searchArtistByInput.fulfilled, (state, action) => {
            state.isLoading = false
            if (!action.payload) return;
            state.artistMatches = action.payload.results.artistmatches.artist;
        })

        builder.addCase(searchArtistByInput.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(searchArtistByInput.rejected, (state, action) => {
            state.isLoading = false
            if (!action.error.message) return;
            state.searchError = action.error.message
        })
    }
})

export default globalSlice.reducer;
export const globalActions = globalSlice.actions
