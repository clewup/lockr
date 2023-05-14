import UserForm from '@/components/UserForm/UserForm';
import Wrapper from '@/components/Wrapper/Wrapper';
import constants from '@/constants/constants';
import { getSession } from '@/utils/functions';
import { Session } from 'next-auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

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
