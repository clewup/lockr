import './globals.css';
import { UserProvider } from '@/contexts/UserContext/UserContext';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Authee',
    description: 'Authentication Service',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <UserProvider>
                <body>{children}</body>
            </UserProvider>
        </html>
    );
}
