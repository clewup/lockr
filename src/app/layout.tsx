import './globals.css';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import SideMenu from '@/components/SideMenu/SideMenu';
import constants from '@/constants/constants';
import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { UserProvider } from '@/contexts/UserContext/UserContext';
import { prisma } from '@/lib/prisma/prisma';
import { getSession } from '@/utils/functions';
import { Session } from 'next-auth';
import { headers } from 'next/headers';
import React, { ReactNode } from 'react';

export const metadata = {
    title: 'Lockr',
    description: 'Authentication Service',
};

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
