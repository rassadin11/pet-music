import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IMusician, IMusiciansState } from '../interfaces/musicians.interface';
import { API_KEY, PREFIX } from '../constants/server';
import Typograf from 'typograf';

const initialState: IMusiciansState = {
    musicians: [],
    errorMessage: ''
}

export const getMusicians = createAsyncThunk('musicians/artists', async (limit: number) => {
    try {
        const {data} = await axios.get(PREFIX + `?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}&lang=ru`)
        return data
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
})

export const getArtistInfoAndAlbum = createAsyncThunk('musicians/albums', async ({name, limit}: {name: string, limit: number}) => {
    try {
        const res1 = await axios.get(PREFIX + `?method=artist.gettopalbums&artist=${name}&api_key=${API_KEY}&format=json&limit=${limit}&lang=ru`)
        const res2 = await axios.get(PREFIX + `?method=artist.getinfo&artist=${name}&api_key=${API_KEY}&format=json&lang=ru`)
        return {data: res1.data, info: res2.data, name};
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
})

export const musiciansSlice = createSlice({
    name: 'musicians',
    initialState,
    reducers: {
        typographTrack: (state) => {
            if (!state.musicians) return;

            const typ = new Typograf({locale: ['ru', 'en-US']});
            state.musicians.forEach((musician) => {
                if (musician.detInfo && musician.detInfo.info && musician.detInfo.info.bio) {
                    musician.detInfo.info.bio.content = typ.execute(musician.detInfo.info.bio.content);
                    musician.detInfo.info.bio.summary = typ.execute(musician.detInfo.info.bio.summary);
                }
            });
        }
    },
    extraReducers: builder => {
        builder.addCase(getMusicians.fulfilled, (state, action) => {
            if (!action.payload) return;
            state.musicians = action.payload.artists.artist.map((item: IMusician) => ({...item, detInfo: {albums: [], info: {}}}))
        })
        
        builder.addCase(getMusicians.rejected, (state, action) => {
            if (!action.payload) return;
            state.errorMessage = action.error.message as string
        })

        builder.addCase(getArtistInfoAndAlbum.fulfilled, (state, action) => {
            state.musicians = state.musicians.map((item) => {
                if (!action.payload) return;
                if (item.name === action.payload.name) {
                    item.detInfo = {
                        albums: action.payload.data.topalbums.album,
                        info: action.payload.info.artist
                    }
                }
                
                return item
            }) as IMusician[]
            
            musiciansSlice.caseReducers.typographTrack(state)
        })

        builder.addCase(getArtistInfoAndAlbum.rejected, (state, action) => {
            if (!action.payload) return;
            state.errorMessage = action.error.message as string
        })
    }
})

export default musiciansSlice.reducer;
export const musiciansActions = musiciansSlice.actions

