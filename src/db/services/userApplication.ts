import { mapUserApplication, mapUserApplications } from '@/db/mappers/userApplication';
import { prisma } from '@/lib/prisma/prisma';
import moment from 'moment/moment';

export default class UserApplicationService {
    async getUserApplications(userId: string) {
        const data = await prisma.userApplication.findMany({
            where: { userId: userId },
        });

        return mapUserApplications(data);
    }

    async upsertUserApplication(applicationId: number, userId: string) {
        const data = await prisma.userApplication.upsert({
            where: {
                applicationId_userId: {
                    applicationId: applicationId,
                    userId: userId,
                },
            },
            update: {
                lastAccessed: moment().toDate(),
            },
            create: {
                application: {
                    connect: {
                        id: applicationId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
                lastAccessed: moment().toDate(),
            },
        });

        return mapUserApplication(data);
    }
}
