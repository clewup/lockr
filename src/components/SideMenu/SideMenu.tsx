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
    ];

    return (
        <div className="p-5">
            <div className="border-b-2 border-gray-200 text-2xl pb-5 pr-32">
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
