import { prisma } from '@/lib/prisma/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import constants from '@/constants/constants';

export const authOptions: NextAuthOptions = {
    providers: [GoogleProvider({ clientId: constants.GOOGLE_CLIENT_ID, clientSecret: constants.GOOGLE_CLIENT_SECRET })],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session({ session, user }) {
            return {
                ...session,
                user: user,
            };
        },
    },
};
