import { UserType } from '@/lib/common/types/userTypes';
import { User } from '@prisma/client';

export function mapUser(user: User): UserType {
    return <UserType>{
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

export function mapUsers(users: User[]): UserType[] {
    return users.map((user) => mapUser(user));
}
