import constants from '@/constants/constants';
import { authOptions } from '@/lib/next-auth/authOptions';
import { prisma } from '@/lib/prisma/prisma';
import moment from 'moment';
import { getServerSession, Session } from 'next-auth';
import { NextResponse as response } from 'next/server';
import * as jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return response.json({}, { status: 401 });
    }

    // create the authorization code with the user id
    function createAuthorizationCode(session: Session) {
        const payload = {
            sub: session.user?.id,
        };

        return jwt.sign(payload, constants.SECRET, { expiresIn: moment().add(5, 'minutes').unix() });
    }
    const code = createAuthorizationCode(session);

    // upsert the user's authorization code in the database
    await prisma.authorizationCode.upsert({
        where: { userId: session.user.id },
        update: { code: code, expires: moment().add(5, 'minutes').utc().toDate() },
        create: {
            code: code,
            expires: moment().add(5, 'minutes').toDate(),
            user: {
                connect: {
                    id: session.user.id,
                },
            },
        },
    });

    return response.json({ authorization_code: code });
}
