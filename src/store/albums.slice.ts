import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAlbumsState } from '../interfaces/albums.interface';
import { API_KEY, PREFIX } from '../constants/server';

const initialState: IAlbumsState = {
    tags: [],
    albums: [],
    activeAlbum: null,
    isLoading: false,
    errorMessage: ''
}

export const getPopularTags = createAsyncThunk(
    'albums/tags',
    async () => {
        try {
            const {data} = await axios.get(PREFIX + `?method=album.gettoptags&artist=radiohead&album=the%20bends&api_key=${API_KEY}&format=json&lang=ru`)
            return data
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message)
            }
        }
    }
)

export const getPopularTracksByTag = createAsyncThunk('albums/tracks', async (tag: string) => {
    try {
        const {data} = await axios.get(PREFIX + `?method=tag.gettopalbums&tag=${tag}&api_key=${API_KEY}&format=json&lang=ru`)
        return data
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
})

export const getAlbumByName = createAsyncThunk('albums/track', async ({name, artist}: {name: string, artist: string}) => {
    try {
        const {data} = await axios.get(PREFIX + `?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${name}&format=json&lang=ru`)
        return data;
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
    }
})

export const albumsSlice = createSlice({
    name: 'musicians',
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(getPopularTags.fulfilled, (state, action) => {
            state.isLoading = false;
            if (!action.payload) return;

            state.tags = action.payload.toptags.tag
        })

        builder.addCase(getPopularTags.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(getPopularTags.rejected, (state, action) => {
            state.isLoading = false;
            if (!action.error.message) return;
            state.errorMessage = action.error.message
        })

        builder.addCase(getPopularTracksByTag.fulfilled, (state, action) => {
            state.isLoading = false;
            if (!action.payload) return;
            state.albums = action.payload.albums.album
        })

        builder.addCase(getPopularTracksByTag.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(getPopularTracksByTag.rejected, (state, action) => {
            state.isLoading = false;
            if (!action.error.message) return;
            state.errorMessage = action.error.message
        })

        builder.addCase(getAlbumByName.fulfilled, (state, action) => {
            state.isLoading = false;
            if (!action.payload) return;
            state.activeAlbum = action.payload.album
        })

        builder.addCase(getAlbumByName.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(getAlbumByName.rejected, (state, action) => {
            state.isLoading = false;
            if (!action.error.message) return;
            state.errorMessage = action.error.message
        })
    }
})

export default albumsSlice.reducer;
export const albumsActions = albumsSlice.actions

// функция-типограф
// function typografText(artistInfo: IArtistInfo): IArtistInfo {
//     const typ = new Typograf({locale: ['ru', 'en-US']});

//     if (artistInfo && artistInfo.bio?.content && artistInfo.bio?.summary) {
//         artistInfo.bio.content = typ.execute(artistInfo.bio.content);
//         artistInfo.bio.summary = typ.execute(artistInfo.bio.summary);
//     }

//     return artistInfo
// }