'use client';

import constants from '@/constants/constants';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';

export default async function Login() {
    return (
        <main className="h-screen flex justify-center items-center">
            <div className="w-1/3 border-2 border-black rounded-2xl p-10 flex flex-col justify-center items-center">
                <GoogleButton onClick={() => signIn('google', { callbackUrl: constants.NEXTAUTH_URL })}>
                    Login
                </GoogleButton>
            </div>
        </main>
    );
}
