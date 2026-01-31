import {createSlice} from '@reduxjs/toolkit'
import {
  IArtistInfo,
  IMusician,
  IMusiciansState,
} from '../../interfaces/musicians.interface'
import Typograf from 'typograf'
import {IAlbum, ITrack} from '../../interfaces/chart.interface'
import {ITag} from '../../interfaces/tags.interface'
import {
  getArtistInfoAndAlbum,
  getMusicianInfo,
  getMusicians,
  getTracksByMusician,
} from './musicians.thunks'

const initialState: IMusiciansState = {
  musicians: [],
  activeMusician: null,
  errorMessage: '',
}

export const musiciansSlice = createSlice({
  name: 'musicians',
  initialState,
  reducers: {
    removeActiveMusician: state => {
      state.activeMusician = null
    },
  },
  extraReducers: builder => {
    builder.addCase(getMusicians.fulfilled, (state, action) => {
      if (!action.payload) return
      state.musicians = action.payload.artists.artist.map(
        (item: IMusician) => ({
          ...item,
          detInfo: {albums: [], info: {}},
        }),
      )
    })

    builder.addCase(getMusicians.rejected, (state, action) => {
      if (!action.payload) return
      state.errorMessage = action.error.message as string
    })

    builder.addCase(
      getArtistInfoAndAlbum.fulfilled,
      (state, action) => {
        state.musicians = state.musicians.map(item => {
          if (!action.payload) return item

          if (item.name === action.payload.name) {
            item.detInfo = {
              albums: action.payload.data.topalbums.album,
              info: action.payload.info.artist,
            }
          }

          return item
        })

        state.musicians.forEach(musician => {
          musician.detInfo = {
            ...musician.detInfo,
            info: typografText(musician.detInfo.info),
          }
        })
      },
    )

    builder.addCase(
      getArtistInfoAndAlbum.rejected,
      (state, action) => {
        if (!action.error.message) return
        state.errorMessage = action.error.message
      },
    )

    builder.addCase(getMusicianInfo.fulfilled, (state, action) => {
      if (!action.payload) return

      state.activeMusician = {
        ...state.activeMusician,
        ...typografText(action.payload.info.artist),
        tags: {
          tag: action.payload.info.artist.tags.tag as ITag[],
        },
        albums: action.payload.data.topalbums.album as IAlbum[],
      }
    })

    builder.addCase(getMusicianInfo.rejected, (state, action) => {
      if (!action.error.message) return
      state.errorMessage = action.error.message
    })

    builder.addCase(
      getTracksByMusician.fulfilled,
      (state, action) => {
        if (!action.payload) return

        if (state.activeMusician) {
          state.activeMusician = {
            ...state.activeMusician,
            toptracks: action.payload.toptracks.track as ITrack[],
          }
        }

        state.musicians.forEach(m => {
          if (m.name === state.activeMusician?.name) {
            m.detInfo.albums = state.activeMusician?.albums || []
            m.toptracks = state.activeMusician?.toptracks
            m.detInfo.info.bio = state.activeMusician.bio
          }
        })
      },
    )

    builder.addCase(getTracksByMusician.rejected, (state, action) => {
      if (!action.error.message) return
      state.errorMessage = action.error.message
    })
  },
})

export default musiciansSlice.reducer
export const musiciansActions = musiciansSlice.actions

// функция-типограф
function typografText(artistInfo: IArtistInfo): IArtistInfo {
  const typ = new Typograf({locale: ['ru', 'en-US']})

  if (
    artistInfo &&
    artistInfo.bio?.content &&
    artistInfo.bio?.summary
  ) {
    artistInfo.bio.content = typ.execute(artistInfo.bio.content)
    artistInfo.bio.summary = typ.execute(artistInfo.bio.summary)
  }

  return artistInfo
}
