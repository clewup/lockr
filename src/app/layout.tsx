import './globals.css';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import SideMenu from '@/components/SideMenu/SideMenu';
import constants from '@/constants/constants';
import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { UserProvider } from '@/contexts/UserContext/UserContext';
import { Session } from 'next-auth';
import { headers } from 'next/headers';
import React, { ReactNode } from 'react';

export const metadata = {
    title: 'Lockr',
    description: 'Authentication Service',
};

async function getSession(cookie: string): Promise<Session | null> {
    const response = await fetch(`${constants.APP_URL}/api/auth/session`, {
        headers: {
            cookie,
        },
    });

    const session = await response.json();

    return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getSession(headers().get('cookie') ?? '');

    return (
        <html lang="en">
            <AuthProvider session={session}>
                <UserProvider>
                    <body>
                        {session ? (
                            <>
                                <Header />
                                <div className="flex min-h-screen-header">
                                    <SideMenu />
                                    {children}
                                </div>
                                <CookieBanner />
                                <Footer />
                            </>
                        ) : (
                            <>{children}</>
                        )}
                    </body>
                </UserProvider>
            </AuthProvider>
        </html>
    );
}
