import { HTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    navigateTo: string;
    isSkeleton?: boolean;   
    children: ReactNode
}