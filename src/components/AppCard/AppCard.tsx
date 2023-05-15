'use client';

import { AppType } from '@/types/appTypes';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import cx from 'classnames';
import { SyncLoader } from 'react-spinners';
import { motion as m } from 'framer-motion';
import { StarIcon as StarOutlineIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface AppCardProps {
    app: AppType;
}

const AppCard: FC<AppCardProps> = ({ app }) => {
    const { data: session, update: updateSession } = useSession();

    const userApp = session?.applications.find((userApp) => userApp.id === app.id);

    const [isLoading, setLoading] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [isFavourited, setFavourited] = useState(userApp?.isFavourited || false);

    async function upsertUserApplication(isFavourited: boolean) {
        setSubmitting(true);
        await fetch('/api/application', {
            method: 'PATCH',
            body: JSON.stringify({ id: app.id, isFavourited: isFavourited }),
        });
        setSubmitting(false);
    }

    async function navigateToApp() {
        setLoading(true);
        const codeResponse = await fetch('/api/auth/code', {
            method: 'POST',
            body: JSON.stringify({ application_id: app.id }),
        });
        const codeData = await codeResponse.json();
        const code = codeData.authorization_code;

        await fetch('/api/application', {
            method: 'PATCH',
            body: JSON.stringify({ id: app.id, isFavourited: isFavourited }),
        });
        await updateSession();

        setLoading(false);

        const formattedUrl = `${app.url}?code=${code}`;
        window.open(formattedUrl, '_blank');
    }

    return (
        <m.div
            className={cx('card cursor-pointer w-52 h-52 shadow-xl z-10', {
                'opacity-70 pointer-events-none': !app.isEnabled,
            })}>
            {isLoading ? (
                <div className="h-full w-full flex justify-center items-center">
                    <SyncLoader size={15} color="#111111" />
                </div>
            ) : (
                <>
                    <div className="card-body">
                        <h1 className="card-title text-4xl">{app.name}</h1>
                        {userApp && <p>Last accessed: {moment(userApp.lastAccessed).format('DD/MM/yyyy')}</p>}
                    </div>

                    <div className="card-actions justify-end p-2">
                        {app.isEnabled ? (
                            <>
                                <m.button
                                    variants={{
                                        hover: { scale: 1.2, rotate: -5 },
                                    }}
                                    whileHover="hover"
                                    onClick={navigateToApp}
                                    disabled={isSubmitting}>
                                    <ArrowRightOnRectangleIcon width={30} height={30} />
                                </m.button>
                                {isFavourited ? (
                                    <m.button
                                        variants={{
                                            hover: { scale: 1.2, rotate: -5 },
                                        }}
                                        whileHover="hover"
                                        onClick={() => {
                                            setFavourited(false);
                                            upsertUserApplication(false);
                                        }}
                                        disabled={isSubmitting}>
                                        <StarSolidIcon width={30} height={30} className="text-yellow-400" />
                                    </m.button>
                                ) : (
                                    <m.button
                                        variants={{
                                            hover: { scale: 1.2, rotate: -5 },
                                        }}
                                        whileHover="hover"
                                        onClick={() => {
                                            setFavourited(true);
                                            upsertUserApplication(true);
                                        }}
                                        disabled={isSubmitting}>
                                        <StarOutlineIcon width={30} height={30} className="text-yellow-400" />
                                    </m.button>
                                )}
                            </>
                        ) : (
                            <span className="badge badge-lg badge-info badge-outline">Coming Soon!</span>
                        )}
                    </div>
                </>
            )}
        </m.div>
    );
};

export default AppCard;
