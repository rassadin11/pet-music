import { IAlbum, IArtist, IImage, ITrack, IWiki } from './chart.interface';
import { ITag } from './tags.interface';

export interface IArtistInfo {
    name: string;
    mbid: string;
    url: string;
    stats: {
        listeners: string | number;
        playcount: string | number
    },
    similar: {
        artist: IArtist[]
    },
    tags: ITag[],
    bio: IWiki
}

export interface IDetInfo {
    albums: IAlbum[],
    info: IArtistInfo
}

export interface IMusician {
    name: string;
    playcount: string | number;
    listeners: string | number;
    mbid: string;
    url: string;
    streamable: string;
    image: IImage[]
    detInfo: IDetInfo
}

export interface IMusiciansState {
    musicians: IMusician[]
    activeMusician: IArtistInfo & {albums?: IAlbum[], toptracks?: ITrack[]} | null;
    errorMessage: string
}