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
            className={cx('card relative cursor-pointer w-52 h-52 shadow-xl', {
                'opacity-70 pointer-events-none': !app.isEnabled,
            })}
            onClick={navigateToApp}>
            {isLoading ? (
                <div className="card-body">
                    <SyncLoader size={15} />
                </div>
            ) : (
                <>
                    <div className="card-body">
                        <h1 className="card-title text-4xl">{app.name}</h1>
                        {session?.applicationAccess[app.id] && (
                            <p>Last accessed: {moment(session?.applicationAccess[app.id]).format('DD/MM/yyyy')}</p>
                        )}
                    </div>

                    <div className="card-actions justify-end p-2">
                        {!app.isEnabled && (
                            <span className="badge badge-lg badge-info badge-outline">Coming Soon!</span>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AppCard;
