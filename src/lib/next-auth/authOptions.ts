import { VerificationEmailRequest } from '@/lib/next-auth/verificationEmail';
import { prisma } from '@/lib/prisma/prisma';
import { UserAppType } from '@/types/appTypes';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import constants from '@/constants/constants';

const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({ clientId: constants.GOOGLE_CLIENT_ID, clientSecret: constants.GOOGLE_CLIENT_SECRET }),
        EmailProvider({
            server: {
                host: constants.SENDGRID_SERVER,
                port: constants.SENDGRID_PORT,
                auth: {
                    user: constants.SENDGRID_USERNAME,
                    pass: constants.SENDGRID_PASSWORD,
                },
            },
            from: constants.EMAIL_FROM,
            sendVerificationRequest({ identifier, url, provider, theme }) {
                VerificationEmailRequest({ identifier, url, provider, theme });
            },
        }),
    ],
    adapter: adapter,
    callbacks: {
        async session({ session, user, trigger, newSession }) {
            // if the update function is called with a user
            // update the database and the session user
            if (trigger === 'update' && newSession.user) {
                session.user = newSession.user;
                await adapter.updateUser(newSession.user);
            }

            // fetch and reduce the user's applications
            const userApps = await prisma.userApplication.findMany({
                where: { userId: user.id },
            });
            const reducedApplications: UserAppType[] = userApps.map((application) => ({
                id: application.applicationId,
                lastAccessed: application.lastAccessed,
                isFavourited: application.isFavourited,
            }));

            return {
                ...session,
                user: user,
                applications: reducedApplications,
            };
        },
    },
    pages: {
        signIn: '/login',
        verifyRequest: '/login?verify=true',
        error: '/error',
        signOut: '/login',
    },
};
