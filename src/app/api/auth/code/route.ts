import constants from '@/constants/constants';
import { applicationService, authorizationCodeService } from '@/db/handler';
import { authOptions } from '@/lib/next-auth/authOptions';
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
    const validApplication = await applicationService.getApplicationById(applicationId);
    if (!validApplication) {
        return response.json({}, { status: 400, statusText: 'Invalid application_id' });
    }

    // create the authorization code with the user id
    function createAuthorizationCode(session: Session) {
        const payload = {
            sub: session.user?.id,
            application_id: applicationId,
        };

        return jwt.sign(payload, constants.SECRET, { expiresIn: 60 * 5 });
    }
    const code = createAuthorizationCode(session);
    await authorizationCodeService.upsertAuthorizationCode(code, user.id);

    return response.json({ authorization_code: code });
}
