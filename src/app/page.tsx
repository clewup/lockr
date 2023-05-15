import AppCard from '@/components/AppCard/AppCard';
import Wrapper from '@/components/Wrapper/Wrapper';
import { prisma } from '@/lib/prisma/prisma';
import { AppType } from '@/types/appTypes';

async function getApplications(): Promise<AppType[]> {
    return prisma.application.findMany({
        select: {
            id: true,
            name: true,
            url: true,
            logo: true,
            isEnabled: true,
        },
        orderBy: [{ isEnabled: 'desc' }, { createdAt: 'desc' }],
    });
}

export default async function Home() {
    const apps = await getApplications();

    return (
        <Wrapper>
            <div className="grid grid-cols-6">
                {apps.map((app, index) => (
                    <AppCard key={index} app={app} />
                ))}
            </div>
        </Wrapper>
    );
}
