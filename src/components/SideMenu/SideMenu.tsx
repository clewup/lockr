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
        <div className="px-5 w-[15vw] ">
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
