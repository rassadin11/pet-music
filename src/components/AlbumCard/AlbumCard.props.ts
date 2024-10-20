import { HTMLAttributes } from 'react';
import { IFullAlbum } from '../../interfaces/albums.interface';

export interface AlbumCardProps extends HTMLAttributes<HTMLDivElement> {
    item: IFullAlbum
}