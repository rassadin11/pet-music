import { IArtist } from '../../interfaces/chart.interface';
import { IMusician } from '../../interfaces/musicians.interface';

export interface MusicianIntroProps {
    items: IMusician[] | IArtist[]
}