import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export type AppType = {
    name: string;
    url: string;
    icon: IconType;
    isDisabled: boolean;
};

type IconType = ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
>;
