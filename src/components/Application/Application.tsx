'use client';

import useApi from '@/lib/common/hooks/useApi/useApi';
import { ApplicationType } from '@/types/applicationTypes';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC, useState } from 'react';
import { SyncLoader } from 'react-spinners';

interface ApplicationProps {
    application: ApplicationType;
}

const Application: FC<ApplicationProps> = ({ application: { id, name, url, logo, color } }) => {
    const { data: session, update: updateSession } = useSession();
    const { patch, post } = useApi();

    const userApp = session?.applications.find((userApp) => userApp.id === id);

    const [isLoading, setLoading] = useState(false);

    async function navigateToApp() {
        setLoading(true);

        const { authorization_code: code } = await post<{ authorization_code: string }>('/api/auth/code', {
            application_id: id,
        });
        await patch('/api/application', { id: id });
        await updateSession();

        setLoading(false);

        const formattedUrl = `${url}?code=${code}`;
        window.open(formattedUrl, '_blank');
    }

    const backgroundColor = color ? `bg-[${color}]` : 'bg-primary';

    return (
        <div className="cursor-pointer w-full z-10 p-3 rounded-md flex flex-col justify-between">
            {isLoading ? (
                <div className="h-full w-full flex justify-center items-center">
                    <SyncLoader size={15} color="#cccccc" />
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <div
                        className={`w-full aspect-square rounded-md relative p-5 ${backgroundColor}`}
                        onClick={navigateToApp}>
                        {logo && (
                            <Image
                                src={logo}
                                alt={name}
                                fill={true}
                                className="h-full aspect-square object-contain p-5"
                            />
                        )}
                    </div>

                    <div className="text-center flex flex-col gap-2">
                        <h1 className="text-2xl font-semibold">{name}</h1>

                        {userApp && (
                            <p className="text-base-300">
                                Last accessed: {moment(userApp.lastAccessed).format('DD/MM/yyyy')}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Application;
