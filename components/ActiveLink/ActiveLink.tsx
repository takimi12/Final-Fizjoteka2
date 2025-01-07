import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ActiveLink.module.scss";

interface NavLinkProps {
	href: string;
	className?: string;
	activeClassName?: string;
	onClick?: () => void;
	children: React.ReactNode;
}

const ActiveLink: React.FC<NavLinkProps> = ({
	href,
	className,
	activeClassName,
	onClick,
	children,
}) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={`${className} ${isActive ? styles.activeClassName : ""}`}
			onClick={onClick}
		>
			{children}
		</Link>
	);
};

export default ActiveLink;
