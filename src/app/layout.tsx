import './globals.css';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import SideMenu from '@/components/SideMenu/SideMenu';
import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { UserProvider } from '@/contexts/UserContext/UserContext';
import CookiePopup from '@/lib/common/components/CookiePopup/CookiePopup';
import { getSession } from '@/utils/functions';
import { headers } from 'next/headers';
import React, { ReactNode } from 'react';

export const metadata = {
    title: 'LOCKR',
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
                                <div className="flex flex-col md:flex-row">
                                    <SideMenu />
                                    {children}
                                </div>
                                <CookiePopup />
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
