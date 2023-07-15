'use client';

import { UserType } from '@/lib/common/types/userTypes';
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react';

type UserContextValues = {
    user: UserType | null;
    setUser: Dispatch<SetStateAction<UserType | null>>;
};
type UserProviderProps = {
    children: ReactNode;
};

const UserContext = createContext<UserContextValues>({} as UserContextValues);

const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

const useUser = () => {
    const context = useContext(UserContext);

    if (!context) throw new Error('useUser must be used within a UserContext');

    return context;
};

export { UserProvider, useUser };
