import { prisma } from '@/lib/prisma/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import constants from '@/constants/constants';

const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
    providers: [GoogleProvider({ clientId: constants.GOOGLE_CLIENT_ID, clientSecret: constants.GOOGLE_CLIENT_SECRET })],
    adapter: adapter,
    callbacks: {
        async session({ session, user, trigger, newSession }) {
            // if the update function is called with a user
            // update the database
            // refresh/update the session
            if (trigger === 'update' && newSession.user) {
                session.user = newSession.user;
                await adapter.updateUser(newSession.user);
            }

            // fetch the user's application access history and reduce it to key value pairs
            const applicationAccess = await prisma.authorizationCode.findMany({
                select: { applicationId: true, updatedAt: true },
                where: { userId: user.id },
            });
            const reducedApplicationAccess = applicationAccess.reduce(
                (acc: Record<number, Date>, { applicationId, updatedAt }) => {
                    acc[applicationId] = updatedAt;
                    return acc;
                },
                {}
            );

            return {
                ...session,
                user: user,
                applicationAccess: reducedApplicationAccess,
            };
        },
    },
};
