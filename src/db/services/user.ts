import { mapUser } from '@/db/mappers/user';
import { UserType } from '@/lib/common/types/userTypes';
import { prisma } from '@/lib/prisma/prisma';

export default class UserService {
    async getUserById(id: string): Promise<UserType | null> {
        const data = await prisma.user.findUnique({ where: { id: id } });

        if (!data) return null;

        return mapUser(data);
    }

    async getUserByEmail(email: string): Promise<UserType | null> {
        const data = await prisma.user.findUnique({ where: { email: email } });

        if (!data) return null;

        return mapUser(data);
    }
}
