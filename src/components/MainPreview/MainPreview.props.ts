import { HTMLAttributes } from 'react';
import { ITag } from '../../interfaces/tags.interface';

export interface MainPreviewProps extends HTMLAttributes<HTMLDivElement> {
    img?: string;
    title: string;
    listens?: string;
    tags?: ITag[]
}