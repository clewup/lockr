'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const SideMenu = () => {
    const menuItems = [
        {
            label: 'Apps',
            path: '/',
        },
        {
            label: 'Account',
            path: '/account',
        },
    ];

    return (
        <div className="p-5 w-[15vw]">
            <div className="border-b-2 border-gray-200 text-2xl pb-5 flex flex-col gap-3">
                {menuItems.map((menuItem, index) => {
                    return (
                        <Link key={index} href={menuItem.path}>
                            <p>{menuItem.label}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SideMenu;
