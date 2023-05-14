import UserForm from '@/components/AccountForm/UserForm';
import Wrapper from '@/components/Wrapper/Wrapper';
import constants from '@/constants/constants';
import { Session } from 'next-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function getSession(cookie: string): Promise<Session | null> {
    const response = await fetch(`${constants.APP_URL}/api/auth/session`, {
        headers: {
            cookie,
        },
    });

    const session = await response.json();

    return Object.keys(session).length > 0 ? session : null;
}

export default async function Account() {
    const session = await getSession(headers().get('cookie') ?? '');

    if (!session || !session.user) {
        redirect('/login');
        return null;
    }

    return (
        <Wrapper>
            <UserForm user={session.user} />
        </Wrapper>
    );
}
