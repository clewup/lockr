'use client';

import { AppType } from '@/types/appTypes';
import Link from 'next/link';
import { FC, useState } from 'react';
import cx from 'classnames';
import { SyncLoader } from 'react-spinners';

interface AppCardProps {
    app: AppType;
}

const AppCard: FC<AppCardProps> = ({ app }) => {
    const [isLoading, setLoading] = useState(false);
    async function navigateToApp() {
        setLoading(true);
        const codeResponse = await fetch('/api/auth/code', { method: 'POST' });
        const codeData = await codeResponse.json();
        const code = codeData.authorization_code;
        setLoading(false);

        const formattedUrl = `${app.url}?code=${code}`;
        window.open(formattedUrl, '_blank');
    }

    return (
        <div
            className={cx(
                'relative cursor-pointer w-64 h-64 border-2 border-black rounded-2xl m-2 flex flex-col justify-center items-center',
                {
                    'opacity-20 pointer-events-none': app.isDisabled,
                }
            )}
            onClick={navigateToApp}>
            {isLoading ? (
                <span>
                    <SyncLoader size={15} />
                </span>
            ) : (
                <h1 className="text-5xl capitalize">{app.name}</h1>
            )}
        </div>
    );
};

export default AppCard;
