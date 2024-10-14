import { HTMLAttributes } from 'react';
import { IMusician } from '../../interfaces/musicians.interface';

export interface ArtistCardProps extends HTMLAttributes<HTMLDivElement> {
    item: IMusician;
}