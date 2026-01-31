import {createSlice} from '@reduxjs/toolkit'
import {IChartState} from '../../interfaces/chart.interface'
import Typograf from 'typograf'
import {getTrack, getTracks} from './chart.thunks'

const initialState: IChartState = {
  tracks: null,
  track: null,
  isLoading: false,
  dateOfRequest: null,
  chartErrorMessage: '',
}

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    sortPositionOfTracks: state => {
      if (!state.tracks) return

      state.tracks = state.tracks.map(item => {
        return {
          ...item,
          playcount: +item.playcount,
          listeners: +item.listeners,
        }
      })

      state.tracks.sort((a, b) =>
        a.playcount > b.playcount ? -1 : 1,
      )
    },

    clearTrack: state => {
      state.track = null
    },

    typographTrack: state => {
      if (!state.track) return

      const typ = new Typograf({locale: ['ru', 'en-US']})
      if (state.track.wiki?.content) {
        state.track.wiki.content = typ.execute(
          state.track.wiki.content,
        )
        state.track.wiki.summary = typ.execute(
          state.track.wiki.summary,
        )
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getTracks.fulfilled, (state, action) => {
      state.isLoading = false
      if (!action.payload) return
      state.tracks = action.payload.tracks.track
      state.dateOfRequest = new Date().getTime()
      console.log('changed date request time')

      chartSlice.caseReducers.sortPositionOfTracks(state)
    })

    builder.addCase(getTracks.pending, state => {
      state.isLoading = true
    })

    builder.addCase(getTracks.rejected, (state, action) => {
      state.isLoading = false
      if (!action.error.message) return
      state.chartErrorMessage = action.error.message
    })

    builder.addCase(getTrack.fulfilled, (state, action) => {
      if (!action.payload) return
      state.track = action.payload.track

      state.isLoading = false
      chartSlice.caseReducers.typographTrack(state)
    })

    builder.addCase(getTrack.pending, state => {
      state.isLoading = true
    })

    builder.addCase(getTrack.rejected, (state, action) => {
      if (!action.error.message) return
      state.chartErrorMessage = action.error.message
      state.isLoading = false
    })
  },
})

export default chartSlice.reducer
export const chartActions = chartSlice.actions
