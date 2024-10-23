import { IAlbum, IImage, ITrack } from './chart.interface';
import { ITag } from './tags.interface';

// используется для предпоказа альбома
export interface IFullAlbum extends Omit<IAlbum, 'uri'> {
    url: string;
    name: string;
    mbid: string;
    artist: {
        name: string;
        mbid: string;
        url: string;
    }
}

// используется для страницы альбома
export interface IActiveAlbum {
    artist: string;
    mbid: string;
    tags: {
        tag: ITag[]
    };
    name: string;
    image: IImage[];
    tracks: {
        track: ITrack[] | ITrack
    };
    listeners: string;
    playcound: string;
    url: string;
    errorMessage: string;
}

export interface IAlbumsState {
    tags: ITag[]
    albums: IFullAlbum[]
    errorMessage: string
    activeAlbum: IActiveAlbum | null
    isLoading: boolean
}