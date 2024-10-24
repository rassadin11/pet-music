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
    toptracks?: ITrack[];
    detInfo: IDetInfo
}

export interface IMusiciansState {
    musicians: IMusician[]
    activeMusician: Omit<IArtistInfo, 'tags'> & {albums?: IAlbum[], toptracks?: ITrack[], tags: {tag: ITag[]}} | null;
    errorMessage: string
}