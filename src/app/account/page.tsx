import UserForm from '@/components/UserForm/UserForm';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { getSession } from '@/utils/functions';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'LOCKR - Account',
};

export default async function Account() {
    const session = await getSession(headers().get('cookie') ?? '');

    if (!session || !session.user) {
        redirect('/login');
        return null;
    }

    return (
        <PageWrapper>
            <UserForm user={session.user} />
        </PageWrapper>
    );
}
