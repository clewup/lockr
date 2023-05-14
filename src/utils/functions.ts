import constants from '@/constants/constants';
import { Session } from 'next-auth';

export async function getSession(cookie: string): Promise<Session | null> {
    const response = await fetch(`${constants.APP_URL}/api/auth/session`, {
        headers: {
            cookie,
        },
    });

    const session = await response.json();

    return Object.keys(session).length > 0 ? session : null;
}
