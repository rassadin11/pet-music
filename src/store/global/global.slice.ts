import {createSlice} from '@reduxjs/toolkit'
import {IGlobalState} from './global.interfaces'
import {
  searchArtistByInput,
  searchTrackByInput,
} from './global.thunks'

const initialState: IGlobalState = {
  trackModal: null,
  trackMatches: null,
  artistMatches: null,
  isLoading: false,
  scrollBarWidth: 0,
  searchError: '',
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setTrackModal: (state, action) => {
      state.trackModal = action.payload
    },
    resetSearch: state => {
      state.trackMatches = null
    },
    resetArtistSearch: state => {
      state.artistMatches = null
    },
    countScrollBarWidth: state => {
      const div = document.createElement('div')
      div.style.visibility = 'hidden'
      div.style.overflow = 'scroll'
      div.style.width = '100px'
      div.style.height = '100px'

      document.body.appendChild(div)
      const scrollbarWidth = div.offsetWidth - div.clientWidth
      document.body.removeChild(div)
      state.scrollBarWidth = scrollbarWidth
    },
  },
  extraReducers: builder => {
    builder.addCase(searchTrackByInput.fulfilled, (state, action) => {
      state.isLoading = false
      if (!action.payload) return
      state.trackMatches = action.payload.results.trackmatches.track
    })

    builder.addCase(searchTrackByInput.pending, state => {
      state.isLoading = true
    })

    builder.addCase(searchTrackByInput.rejected, (state, action) => {
      state.isLoading = false
      if (!action.error.message) return
      state.searchError = action.error.message
    })

    builder.addCase(
      searchArtistByInput.fulfilled,
      (state, action) => {
        state.isLoading = false
        if (!action.payload) return
        state.artistMatches =
          action.payload.results.artistmatches.artist
      },
    )

    builder.addCase(searchArtistByInput.pending, state => {
      state.isLoading = true
    })

    builder.addCase(searchArtistByInput.rejected, (state, action) => {
      state.isLoading = false
      if (!action.error.message) return
      state.searchError = action.error.message
    })
  },
})

export default globalSlice.reducer
export const globalActions = globalSlice.actions
