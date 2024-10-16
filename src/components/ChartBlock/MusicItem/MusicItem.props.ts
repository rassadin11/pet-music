import { HTMLAttributes } from 'react';
import { ITrack } from '../../../interfaces/chart.interface';
import { omitTableColumns } from '../../TracksTable/TracksTable.props';

export interface MusicItemProps extends HTMLAttributes<HTMLTableRowElement> {
    item: ITrack
    idx: number
    without?: omitTableColumns[];
}