import constants from '@/constants/constants';
import { applicationService, authorizationCodeService } from '@/db/handler';
import { ApplicationType } from '@/types/applicationTypes';
import { GrantTypes, TokenRequestPayloadType } from '@/lib/common/types/tokenTypes';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import { NextResponse as response } from 'next/server';

export async function POST(request: Request) {
    const body: TokenRequestPayloadType = await request.json();

    const { isValid, errors } = validate(body);
    if (!isValid) {
        return response.json(
            {
                message: `Error: ${errors.join(', ')}`,
            },
            { status: 400 }
        );
    }

    const { grant_type, authorization_code, client_id, client_secret } = body;

    if (grant_type === GrantTypes.AuthorizationCode) {
        const decodedAuthorizationCode = jwt.decode(authorization_code) as any;
        const userId = decodedAuthorizationCode?.sub;
        const expiry = decodedAuthorizationCode?.exp;

        // validate that the code, once decoded, contains the user's id
        if (!userId || typeof userId !== 'string') {
            return response.json(
                { error: 'Invalid authorization_code' },
                { status: 400, statusText: 'Invalid authorization_code' }
            );
        }

        // validate that the code has not expired
        if (moment.unix(expiry).isBefore(moment())) {
            return response.json(
                { error: 'Expired authorization_code' },
                { status: 400, statusText: 'Expired authorization_code' }
            );
        }

        // validate that the authorization code is valid for the user
        const userAuthorizationCode = await authorizationCodeService.getAuthorizationCode(authorization_code, userId);
        if (!userAuthorizationCode) {
            return response.json(
                { error: 'Invalid authorization_code' },
                { status: 400, statusText: 'Invalid authorization_code' }
            );
        }

        // create the access token with the user information
        const accessToken = createUserAccessToken(userAuthorizationCode.user);
        return response.json({ access_token: accessToken });
    }

    if (grant_type === GrantTypes.ClientCredentials) {
        // validate that the client_secret is linked to an application
        // validate that the client_id matches the linked application
        const application = await applicationService.getApplicationBySecret(client_secret!);
        if (!application || application.id !== client_id) {
            return response.json({ error: 'Invalid client_id' }, { status: 400, statusText: 'Invalid client_id' });
        }

        const accessToken = createClientAccessToken(application);
        return response.json({ access_token: accessToken });
    }
}

function validate(payload: TokenRequestPayloadType) {
    const errors: string[] = [];

    if (!payload.grant_type) errors.push('grant_type');

    if (payload.grant_type === GrantTypes.AuthorizationCode) {
        if (!payload.authorization_code) errors.push('authorization_code');
    }

    if (payload.grant_type === GrantTypes.ClientCredentials) {
        if (!payload.client_id) errors.push('client_id');
        if (!payload.client_secret) errors.push('client_secret');
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
    };
}

function createUserAccessToken(user: User) {
    const payload = {
        ...user,
    };

    return jwt.sign(payload, constants.SECRET, { expiresIn: 60 * 5 });
}

function createClientAccessToken(application: ApplicationType) {
    const payload = {
        id: application.id,
        url: application.url,
        role: 'Client',
    };

    return jwt.sign(payload, constants.SECRET, { expiresIn: 60 * 5 });
}
