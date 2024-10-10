import { HTMLAttributes } from 'react';
import { ITrack } from '../../../interfaces/chart.interface';

export interface MusicItemProps extends HTMLAttributes<HTMLTableRowElement> {
    item: ITrack
    idx: number
}