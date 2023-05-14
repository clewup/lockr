'use client';

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
            <div className="flex items-center">
                <Link href={'/'}>
                    <h1 className="text-4xl">Lockr</h1>
                </Link>
            </div>
            <div className="flex gap-5">
                <span className="flex flex-col justify-center">
                    <p>{session?.user?.email}</p>
                    <p onClick={() => signOut()} className="cursor-pointer">
                        Sign Out
                    </p>
                </span>

                {session.user.image ? (
                    <Image src={session.user.image} alt="user_image" width={50} height={50} className="rounded-[50%]" />
                ) : (
                    <Avvvatars value={session.user.email} size={50} />
                )}
            </div>
        </div>
    );
};

export default Header;
