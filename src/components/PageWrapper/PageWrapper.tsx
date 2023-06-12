'use client';

import useAuthorizationCode from '@/hooks/useAuthorizationCode/useAuthorizationCode';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { motion as m } from 'framer-motion';

interface PageWrapperProps {
    children: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
    const { data: session } = useSession();
    const { isLoading } = useAuthorizationCode({ isAuthed: true });

    if (!session) {
        redirect('/login');
        return null;
    }

    return (
        <m.main
            variants={{
                hidden: {
                    y: 75,
                    opacity: 0,
                },
                visible: {
                    y: 0,
                    opacity: 1,
                },
            }}
            initial="hidden"
            animate="visible"
            className="md:w-screen-side-menu p-5">
            {children}
        </m.main>
    );
};

export default PageWrapper;
