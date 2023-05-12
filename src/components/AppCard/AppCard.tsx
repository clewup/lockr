import { AppType } from '@/types/appTypes';
import Link from 'next/link';
import { FC } from 'react';
import cx from 'classnames';

interface AppCardProps {
    app: AppType;
}

const AppCard: FC<AppCardProps> = ({ app }) => {
    return (
        <Link href={app.url} target="_blank" className={cx({ 'pointer-events-none opacity-20': app.isDisabled })}>
            <div className="w-64 h-64 border-2 border-black rounded-2xl m-2 flex flex-col justify-center items-center">
                <h1 className="text-5xl capitalize">{app.name}</h1>
            </div>
        </Link>
    );
};

export default AppCard;
