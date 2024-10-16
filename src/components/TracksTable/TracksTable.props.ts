import { HTMLAttributes } from 'react';
import { ITrack } from '../../interfaces/chart.interface';

export type omitTableColumns = 'artistName' | 'listens'

export interface TracksTableProps extends HTMLAttributes<HTMLTableElement> {
    tracks: ITrack[]
    without?: omitTableColumns[]
}