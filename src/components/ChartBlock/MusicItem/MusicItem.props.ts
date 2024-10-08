import { HTMLAttributes } from 'react';
import { ITrack } from '../../../interfaces/chart.interface';

export interface MusicItemProps extends HTMLAttributes<HTMLTableRowElement> {
    item: ITrack
    openModal: (item: ITrack) => void
    idx: number
}