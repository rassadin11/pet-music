export interface IArtist {
    id: string,
    name: string,
    type: string,
    uri: string,
}

export interface IImage {
    text: string
    size: "small" | 'medium' | 'large' | 'extralarge'
}

export interface IAlbum {
    name: string,
    uri: string
}

export interface ITrack {
    name: string,
    url: string,
    duration: number
    playcount: false,
    listeners: string | number,
    mbid: boolean,
    artist: IArtist
}