import { authorizationCodeService } from '@/db/handler';
import { User } from '@prisma/client';
import moment from 'moment';
import { NextResponse as response } from 'next/server';
import * as jwt from 'jsonwebtoken';
import constants from '@/constants/constants';

export async function POST(request: Request) {
    const body = await request.json();
    const code = body.authorization_code;

    enum TokenErrorCodes {
        MISSING = '001',
        NON_STRING = '002',
        NO_USER_ID = '003',
        PASSED_CODE_EXPIRED = '004',
        INVALID_CODE = '005',
    }

    // validate that a code has been passed in the body with the correct type
    if (!code) {
        return response.json(
            { error: 'Missing authorization_code', code: TokenErrorCodes.MISSING },
            { status: 400, statusText: 'Missing authorization_code' }
        );
    }
    if (typeof code !== 'string') {
        return response.json(
            { error: 'Invalid authorization_code', code: TokenErrorCodes.NON_STRING },
            { status: 400, statusText: 'Invalid authorization_code' }
        );
    }

    const decodedCode = jwt.decode(code) as any;
    const userId = decodedCode?.sub;
    const expiry = decodedCode?.exp;

    // verify that the code, once decoded, contains the user's id
    if (!userId || typeof userId !== 'string') {
        return response.json(
            { error: 'Invalid authorization_code', code: TokenErrorCodes.NO_USER_ID },
            { status: 400, statusText: 'Invalid authorization_code' }
        );
    }
    // verify that the code has not expired
    if (moment.unix(expiry).isBefore(moment())) {
        return response.json(
            { error: 'Expired authorization_code', code: TokenErrorCodes.PASSED_CODE_EXPIRED },
            { status: 400, statusText: 'Expired authorization_code' }
        );
    }

    const authorizationCode = await authorizationCodeService.getAuthorizationCode(code, userId);
    if (!authorizationCode) {
        return response.json(
            { error: 'Invalid authorization_code', code: TokenErrorCodes.INVALID_CODE },
            { status: 400, statusText: 'Invalid authorization_code' }
        );
    }

    // create the access token with the user information
    function createAccessToken(user: User) {
        const payload = {
            ...user,
        };

        return jwt.sign(payload, constants.SECRET, { expiresIn: 60 * 5 });
    }
    const accessToken = createAccessToken(authorizationCode.user);

    return response.json({ access_token: accessToken });
}
