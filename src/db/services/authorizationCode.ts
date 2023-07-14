import { prisma } from '@/lib/prisma/prisma';
import moment from 'moment/moment';

export default class AuthorizationCodeService {
    async getAuthorizationCode(authorizationCode: string, userId: string) {
        const data = await prisma.authorizationCode.findFirst({
            include: { user: true },
            where: {
                code: authorizationCode,
                userId: userId,
            },
        });

        if (!data) return null;
        if (moment(data.expires).isBefore(moment())) return null;

        return data;
    }

    async upsertAuthorizationCode(authorizationCode: string, userId: string) {
        const data = await prisma.authorizationCode.upsert({
            where: {
                userId: userId,
            },
            update: { code: authorizationCode, expires: moment.utc().add(5, 'minutes').toDate() },
            create: {
                code: authorizationCode,
                expires: moment.utc().add(5, 'minutes').toDate(),
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return data;
    }
}
