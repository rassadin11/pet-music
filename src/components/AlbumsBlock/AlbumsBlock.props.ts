import { HTMLAttributes } from 'react';
import { IFullAlbum } from '../../interfaces/albums.interface';

export interface AlbumsBlockProps extends HTMLAttributes<HTMLDivElement> {
    albums: IFullAlbum[] | undefined
}