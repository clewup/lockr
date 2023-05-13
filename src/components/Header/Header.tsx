'use client';

import metadata from '@/constants/metadata';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    const { data: session } = useSession();

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
                <Image
                    src={session?.user?.image || metadata.image}
                    alt="user_image"
                    width={50}
                    height={50}
                    className="rounded-[50%]"
                />
            </div>
        </div>
    );
};

export default Header;
