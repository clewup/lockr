import { userApplicationService } from '@/db/handler';
import { VerificationEmailRequest } from '@/lib/next-auth/verificationEmail';
import { prisma } from '@/lib/prisma/prisma';
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

            // fetch user applications
            const userApplications = await userApplicationService.getUserApplications(user.id);

            return {
                ...session,
                user: user,
                applications: userApplications,
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
