'use client';

import Logo from '@/components/Logo/Logo';
import Avvvatars from 'avvvatars-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();

    if (!session || !session.user) {
        router.push('/login');
        return null;
    }

    return (
        <div className="w-screen flex justify-between px-5 items-center h-[10vh]">
            <Link href={'/'} className="flex items-center gap-2">
                <Logo className="fill-primary" />
                <h1 className="text-4xl font-roboto font-bold text-primary">Lockr</h1>
            </Link>
            <div className="flex gap-5">
                <span className="flex flex-col justify-center">
                    <p>{session?.user?.email}</p>
                    <p onClick={() => signOut()} className="link link-hover link-primary">
                        Sign Out
                    </p>
                </span>

                {session.user.image ? (
                    <span className="avatar">
                        <Image
                            src={session.user.image}
                            alt="user_image"
                            width={50}
                            height={50}
                            className="mask mask-squircle"
                        />
                    </span>
                ) : (
                    <Avvvatars value={session.user.email} size={50} />
                )}
            </div>
        </div>
    );
};

export default Header;
