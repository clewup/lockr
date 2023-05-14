'use client';

import constants from '@/constants/constants';
import useAuthorizationCode from '@/hooks/useAuthorizationCode/useAuthorizationCode';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import GoogleButton from 'react-google-button';

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
            <div className="w-1/3 border-2 border-black rounded-2xl p-10 flex flex-col justify-center items-center">
                <span className="mb-10 border-b-2 border-gray-200">
                    <h1 className="text-3xl">Lockr</h1>
                    <p className="text-xl mb-3">Passwordless authentication.</p>
                </span>

                <GoogleButton onClick={() => signIn('google', { callbackUrl: constants.APP_URL })}>Login</GoogleButton>
            </div>
        </main>
    );
}
