import { prisma } from '@/lib/prisma/prisma';
import { User } from '@prisma/client';
import moment from 'moment';
import { NextResponse as response } from 'next/server';
import * as jwt from 'jsonwebtoken';
import constants from '@/constants/constants';

export async function POST(request: Request) {
    const body = await request.json();
    const code = body.authorization_code;

    // verify that a code has been passed in the body with the correct type
    if (!code) {
        return response.json({}, { status: 400, statusText: 'Missing authorization_code' });
    }
    if (typeof code !== 'string') {
        return response.json({}, { status: 400, statusText: 'Invalid authorization_code' });
    }

    const decodedToken = jwt.decode(code) as any;
    const userId = decodedToken?.sub;
    const expiry = decodedToken?.exp;

    // verify that the code, once decoded, contains the user's id
    if (!userId || typeof userId !== 'string') {
        return response.json({}, { status: 400, statusText: 'Invalid authorization_code' });
    }
    // verify that the code has not expired
    if (moment(expiry).isAfter(moment())) {
        return response.json({}, { status: 400, statusText: 'Expired authorization_code' });
    }

    // query the database for a matching authorization code
    // verify that the queried entity exists
    const validCode = await prisma.authorizationCode.findUnique({
        include: { user: true },
        where: { code: code, userId: userId },
    });
    if (!validCode) {
        return response.json({}, { status: 400, statusText: 'Invalid authorization_code' });
    }
    // verify that the validated code has not expired
    if (moment(validCode.expires).isAfter(moment())) {
        return response.json({}, { status: 400, statusText: 'Expired authorization_code' });
    }

    // create the access token with the user information
    function createAccessToken(user: User) {
        const payload = {
            ...user,
        };

        return jwt.sign(payload, constants.SECRET, { expiresIn: moment().add(2, 'hours').unix() });
    }
    const accessToken = createAccessToken(validCode.user);

    return response.json({ access_token: accessToken });
}
