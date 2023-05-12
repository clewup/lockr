'use client';

import metadata from '@/constants/metadata';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Header = () => {
    const { data: session } = useSession();

    return (
        <div className="w-screen flex justify-end p-2 gap-5">
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
    );
};

export default Header;
