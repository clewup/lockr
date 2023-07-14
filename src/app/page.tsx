import Application from '@/components/Application/Application';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { applicationService } from '@/db/handler';

export const metadata = {
    title: 'LOCKR - Applications',
};

export default async function Home() {
    const applications = await applicationService.getApplications();

    return (
        <PageWrapper>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-6 grid-flow-col">
                {applications.map((application, index) => (
                    <Application key={index} application={application} />
                ))}
            </div>
        </PageWrapper>
    );
}
