import './globals.css';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import SideMenu from '@/components/SideMenu/SideMenu';
import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { UserProvider } from '@/contexts/UserContext/UserContext';
import { getSession } from '@/utils/functions';
import { headers } from 'next/headers';
import React, { ReactNode } from 'react';

export const metadata = {
    title: 'Lockr',
    description: 'Authentication Service',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getSession(headers().get('cookie') ?? '');

    return (
        <html lang="en" data-theme="lockr">
            <AuthProvider session={session}>
                <UserProvider>
                    <body>
                        {session ? (
                            <>
                                <Header />
                                <div className="flex flex-col min-h-screen-header md:flex-row">
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
