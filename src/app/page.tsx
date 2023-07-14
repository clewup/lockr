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
            color: true,
        },
        orderBy: [{ createdAt: 'desc' }],
    });
}

export const metadata = {
    title: 'lockr - Applications',
};

export default async function Home() {
    const apps = await getApplications();

    return (
        <PageWrapper>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-6 grid-flow-col">
                {apps.map((app, index) => (
                    <Application key={index} app={app} />
                ))}
            </div>
        </PageWrapper>
    );
}
