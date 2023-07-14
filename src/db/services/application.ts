import { mapApplication, mapApplications } from '@/db/mappers/application';
import { prisma } from '@/lib/prisma/prisma';
import { ApplicationType } from '@/types/applicationTypes';

export default class ApplicationService {
    async getApplications(): Promise<ApplicationType[]> {
        const data = await prisma.application.findMany({
            orderBy: [{ createdAt: 'desc' }],
        });

        return mapApplications(data);
    }

    async getApplicationById(id: number): Promise<ApplicationType | null> {
        const data = await prisma.application.findUnique({ where: { id: id } });

        if (!data) return null;

        return mapApplication(data);
    }

    async getApplicationBySecret(secret: string): Promise<ApplicationType | null> {
        const data = await prisma.application.findUnique({ where: { secret: secret } });

        if (!data) return null;

        return mapApplication(data);
    }
}
