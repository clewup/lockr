import { ApplicationType } from '@/types/applicationTypes';
import { Application } from '@prisma/client';

export function mapApplication(application: Application): ApplicationType {
    return {
        id: application.id,
        name: application.name,
        url: application.url,
        logo: application.logo,
        color: application.color,
    };
}

export function mapApplications(applications: Application[]): ApplicationType[] {
    return applications.map((application) => mapApplication(application));
}
