'use client';

import constants from '@/constants/constants';
import useAuthorizationCode from '@/hooks/useAuthorizationCode/useAuthorizationCode';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { motion as m } from 'framer-motion';

export default function Login() {
    const { data: session } = useSession();
    const { isLoading } = useAuthorizationCode({ isAuthed: false });

    useEffect(() => {
        if (session && !isLoading) {
            redirect('/');
        }
    }, [isLoading]);

    if (session) {
        return null;
    }

    return (
        <main className="h-screen flex justify-center items-center">
            <div className="w-1/3 shadow-xl rounded-2xl p-10 flex flex-col justify-center items-center">
                <m.span
                    variants={{
                        hidden: { x: -75, opacity: 0 },
                        visible: { x: 0, opacity: 1 },
                    }}
                    initial="hidden"
                    animate="visible"
                    className="mb-10">
                    <h1 className="text-3xl">Lockr</h1>
                    <p className="text-xl mb-3">Passwordless authentication.</p>
                    <span className="divider" />
                </m.span>

                <m.span
                    variants={{
                        hidden: { scale: 0, opacity: 0 },
                        visible: { scale: 1, opacity: 1, transition: { delay: 0.3 } },
                    }}
                    initial="hidden"
                    animate="visible">
                    <GoogleButton onClick={() => signIn('google', { callbackUrl: constants.APP_URL })}>
                        Login
                    </GoogleButton>
                </m.span>
            </div>
        </main>
    );
}
