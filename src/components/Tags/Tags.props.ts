import { HTMLAttributes } from 'react';
import { ITag } from '../../interfaces/tags.interface';

export interface TagsProps extends HTMLAttributes<HTMLDivElement> {
    tags: ITag[]
    color?: 'white'
}