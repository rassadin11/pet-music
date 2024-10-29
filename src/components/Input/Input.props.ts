import { HTMLAttributes } from 'react';

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    placeholder: string,
    type: "text" | 'password' | 'email' | 'number' | 'tel' | 'checkbox' | 'button'
}