import { FC, ReactNode } from 'react';

interface WrapperProps {
    children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
    return <main className="w-[85vw] px-5">{children}</main>;
};

export default Wrapper;
