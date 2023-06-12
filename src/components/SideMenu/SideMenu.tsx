'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cx from 'classnames';

const SideMenu = () => {
    const pathname = usePathname();

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
        <div className="p-5 md:w-[15vw] bg-base-200">
            <ul className="menu">
                {menuItems.map((menuItem, index) => {
                    return (
                        <li key={index} className={cx({ active: pathname === menuItem.path })}>
                            <Link href={menuItem.path}>{menuItem.label}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SideMenu;
