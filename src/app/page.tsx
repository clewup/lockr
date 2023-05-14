import AppCard from '@/components/AppCard/AppCard';
import Wrapper from '@/components/Wrapper/Wrapper';
import { prisma } from '@/lib/prisma/prisma';
import { getSession } from '@/utils/functions';
import { headers } from 'next/headers';

async function getApplications() {
    return prisma.application.findMany({ orderBy: [{ isEnabled: 'desc' }, { createdAt: 'desc' }] });
}

export default async function Home() {
    const session = await getSession(headers().get('cookie') ?? '');
    const applications = await getApplications();

    return (
        <Wrapper>
            <div className="grid grid-cols-6">
                {applications.map((app, index) => (
                    <AppCard key={index} app={app} />
                ))}
            </div>
        </Wrapper>
    );
}
