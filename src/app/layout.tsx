import './globals.css';
import Header from '@/components/Header/Header';
import SideMenu from '@/components/SideMenu/SideMenu';
import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { UserProvider } from '@/contexts/UserContext/UserContext';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Lockr',
    description: 'Authentication Service',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getServerSession();

    return (
        <html lang="en">
            <AuthProvider>
                <UserProvider>
                    <body>
                        {session ? (
                            <>
                                <Header />
                                <div className="flex">
                                    <SideMenu />
                                    {children}
                                </div>
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
