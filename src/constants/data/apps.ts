import { AppType } from '@/types/appTypes';

import { LockClosedIcon, PencilSquareIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const apps: AppType[] = [
    {
        name: 'lockr',
        url: 'https://lockr.clewup.co.uk',
        icon: LockClosedIcon,
        isDisabled: false,
    },
    {
        name: 'blog',
        url: 'https://blog.clewup.co.uk',
        icon: PencilSquareIcon,
        isDisabled: false,
    },
    {
        name: 'store',
        url: 'https://store.clewup.co.uk',
        icon: ShoppingCartIcon,
        isDisabled: true,
    },
];

export default apps;
