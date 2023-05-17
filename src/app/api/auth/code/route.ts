import constants from '@/constants/constants';
import { authOptions } from '@/lib/next-auth/authOptions';
import { prisma } from '@/lib/prisma/prisma';
import moment from 'moment';
import { getServerSession, Session } from 'next-auth';
import { NextResponse as response } from 'next/server';
import * as jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) {
        return response.json({}, { status: 401 });
    }

    // verify that the application id has been passed and is valid
    const body = await request.json();
    if (!body.application_id) {
        return response.json({}, { status: 400, statusText: 'Missing application_id' });
    }
    const applicationId = parseInt(body.application_id);
    if (!applicationId) {
        return response.json({}, { status: 400, statusText: 'Invalid application_id' });
    }
    const validApplication = await prisma.application.findUnique({ where: { id: applicationId } });
    if (!validApplication) {
        return response.json({}, { status: 400, statusText: 'Invalid application_id' });
    }

    // create the authorization code with the user id
    function createAuthorizationCode(session: Session) {
        const payload = {
            sub: session.user?.id,
            application_id: applicationId,
        };

        return jwt.sign(payload, constants.SECRET, { expiresIn: moment().add(5, 'minutes').utc().unix() });
    }
    const code = createAuthorizationCode(session);

    // upsert the user's authorization code in the database
    await prisma.authorizationCode.upsert({
        where: {
            userId: user.id,
        },
        update: { code: code, expires: moment().add(5, 'minutes').utc().toDate() },
        create: {
            code: code,
            expires: moment().add(5, 'minutes').utc().toDate(),
            user: {
                connect: {
                    id: user.id,
                },
            },
        },
    });

    return response.json({ authorization_code: code });
}
