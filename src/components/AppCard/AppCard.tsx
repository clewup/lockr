'use client';

import { Application } from '@prisma/client';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import cx from 'classnames';
import { SyncLoader } from 'react-spinners';

interface AppCardProps {
    app: Application;
}

const AppCard: FC<AppCardProps> = ({ app }) => {
    const [isLoading, setLoading] = useState(false);
    const { data: session, update: updateSession } = useSession();

    async function navigateToApp() {
        setLoading(true);
        const codeResponse = await fetch('/api/auth/code', {
            method: 'POST',
            body: JSON.stringify({ application_id: app.id }),
        });
        const codeData = await codeResponse.json();
        const code = codeData.authorization_code;
        await updateSession();
        setLoading(false);

        const formattedUrl = `${app.url}?code=${code}`;
        window.open(formattedUrl, '_blank');
    }

    return (
        <div
            className={cx(
                'relative cursor-pointer w-52 h-52 border-2 border-black rounded-2xl m-2 flex flex-col justify-center items-center',
                {
                    'opacity-20 pointer-events-none': !app.isEnabled,
                }
            )}
            onClick={navigateToApp}>
            {isLoading ? (
                <span>
                    <SyncLoader size={15} />
                </span>
            ) : (
                <span className="flex flex-col gap-5 items-center">
                    <h1 className="text-5xl capitalize">{app.name}</h1>
                    {session?.applicationAccess[app.id] && (
                        <p>Accessed: {moment(session?.applicationAccess[app.id]).format('DD/MM/yyyy')}</p>
                    )}
                </span>
            )}
        </div>
    );
};

export default AppCard;
