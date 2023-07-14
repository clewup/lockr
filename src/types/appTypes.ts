import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export type AppType = {
    id: number;
    name: string;
    url: string;
    logo: string | null;
    color: string | null;
};

export type UserAppType = {
    id: number;
    lastAccessed: Date | null;
};
