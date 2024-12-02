import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
    href: string;
    className?: string;
    activeClassName?: string;
    onClick?: () => void; 
    children: React.ReactNode;
}

const ActiveLink: React.FC<NavLinkProps> = ({ href, className, activeClassName, onClick, children }) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} className={`${className} ${isActive ? activeClassName : ''}`} onClick={onClick}>
            {children}
        </Link>
    );
};

export default ActiveLink;