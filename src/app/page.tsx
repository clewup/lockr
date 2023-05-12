import AppCard from '@/components/AppCard/AppCard';
import apps from '@/constants/data/apps';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getServerSession();

    if (!session) {
        redirect('/login');
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
