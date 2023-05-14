'use client';

import useAuthorizationCode from '@/hooks/useAuthorizationCode/useAuthorizationCode';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface WrapperProps {
    children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
    const { data: session } = useSession();
    const { isLoading } = useAuthorizationCode({ isAuthed: true });

    if (!session) {
        redirect('/login');
        return null;
    }

    return <main className="w-[85vw] px-5">{children}</main>;
};

export default Wrapper;
