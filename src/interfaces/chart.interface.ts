import { ITag } from './tags.interface'

export interface IArtist {
    id: string,
    name: string,
    type: string,
    uri: string,
}

export interface IImage {
    '#text': string
    size: "small" | 'medium' | 'large' | 'extralarge'
}

export interface IAlbum {
    name: string,
    uri: string,
    image?: IImage[]
}

export interface ITrack {
    name: string,
    url: string,
    duration: number
    playcount: string | number,
    listeners: string | number,
    mbid: boolean,
    artist: IArtist
    album?: IAlbum
    toptags: {
        tag: ITag[]
    }
}

export interface IWiki {
    published: string
    summary: string
    content: string
}

export interface IChartState {
    tracks: ITrack[] | null
    track: ITrack & {wiki: IWiki} | null
    isLoading: boolean
    dateOfRequest: number | null
    chartErrorMessage: string
}