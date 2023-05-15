import { UserAppType } from '@/types/appTypes';
import { User as PrismaUser, Role } from '@prisma/client';

declare module 'next-auth' {
    interface User extends PrismaUser {
        id: string;
        name: string | null | undefined;
        email: string;
        emailVerified: Date | null | undefined;
        image: string | null | undefined;
        role: Role;
    }

    interface Session {
        user: User;
        applications: UserAppType[];
    }
}
