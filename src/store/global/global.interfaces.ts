import {ITrack} from '../../interfaces/chart.interface'

export interface ISearchTrack {
  name: string
  artist: string
  url: string
  streamable: string
  listeners: string
  image: string
}

export interface IArtistSearch {
  name: string
  mbid: string
  url: string
  image_small: string
  image: string
  streamable: string | number
  listeners: string
}

export interface IGlobalState {
  trackModal: ITrack | null
  trackMatches: ISearchTrack[] | null
  artistMatches: IArtistSearch[] | null
  isLoading: boolean
  searchError: string
  scrollBarWidth: number
}

export enum TypeOfTrackMatches {
  ADD = 'add',
  CLEAR = 'clear',
}
