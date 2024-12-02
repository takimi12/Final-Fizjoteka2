import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
    href: string;
    className?: string;
    activeClassName?: string;
    onClick?: () => void; 
    children: React.ReactNode;
}

const ActiveLink: React.FC<NavLinkProps> = ({ href, className, activeClassName, onClick, children }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className={`${className} ${isActive ? activeClassName : ''}`} onClick={onClick}>
            {children}
        </Link>
    );
};

export default ActiveLink;