import AppCard from '@/components/AppCard/AppCard';
import apps from '@/constants/data/apps';

export default async function Home() {
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
