'use client';

import AppCard from '@/components/AppCard/AppCard';
import apps from '@/constants/data/apps';
import useAuthorizationCode from '@/hooks/useAuthorizationCode/useAuthorizationCode';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default async function Home() {
    const { data: session } = useSession();
    const { isLoading } = useAuthorizationCode({ isAuthed: true });

    if (!session) {
        redirect('/login');
        return null;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <div className="grid grid-cols-5">
                {apps.map((app, index) => (
                    <AppCard key={index} app={app} />
                ))}
            </div>
        </main>
    );
}
