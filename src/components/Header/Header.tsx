'use client';

import Avvvatars from 'avvvatars-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion as m } from 'framer-motion';

const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();

    if (!session || !session.user) {
        router.push('/login');
        return null;
    }

    return (
        <div className="flex justify-between px-5 items-center h-[8vh] bg-primary">
            <Link href={'/'} className="flex items-center gap-2">
                <Image
                    src="https://res.cloudinary.com/dliog6kq6/image/upload/v1689286597/locker-dynamic-gradient_lle2ji.png"
                    alt="logo"
                    width={50}
                    height={50}
                />
            </Link>
            <m.div
                variants={{
                    hidden: { y: -50, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                }}
                initial="hidden"
                animate="visible"
                className="flex gap-5">
                <span className="flex flex-col justify-center text-sm">
                    <p className="text-base-100">{session?.user?.email}</p>
                    <p onClick={() => signOut()} className="link link-hover text-base-100">
                        Sign Out
                    </p>
                </span>

                {session.user.image ? (
                    <span className="avatar">
                        <Image
                            src={session.user.image}
                            alt="user_image"
                            width={35}
                            height={35}
                            className="mask mask-squircle"
                        />
                    </span>
                ) : (
                    <Avvvatars value={session.user.email} size={50} />
                )}
            </m.div>
        </div>
    );
};

export default Header;
