import Application from '@/components/Application/Application';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
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

export const metadata = {
    title: 'Lockr - Applications',
};

export default async function Home() {
    const apps = await getApplications();

    return (
        <PageWrapper>
            <div className="grid grid-cols-1 md:grid-cols-6">
                {apps.map((app, index) => (
                    <Application key={index} app={app} />
                ))}
            </div>
        </PageWrapper>
    );
}
