'use client';

import { getSession, signIn } from 'next-auth/react';

export default async function Login() {
    return (
        <main>
            <button onClick={() => signIn('google')}>Login</button>
        </main>
    );
}
