import './globals.css';
import Header from '@/components/Header/Header';
import SideMenu from '@/components/SideMenu/SideMenu';
import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { UserProvider } from '@/contexts/UserContext/UserContext';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Lockr',
    description: 'Authentication Service',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <AuthProvider>
                <UserProvider>
                    <body>
                        <Header />
                        <div className="flex">
                            <SideMenu />
                            {children}
                        </div>
                    </body>
                </UserProvider>
            </AuthProvider>
        </html>
    );
}
