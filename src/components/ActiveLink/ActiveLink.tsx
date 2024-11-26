"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ exact = true, href, activeClassName, className, children }: any) => {
	const pathname = usePathname();

	const isActive = () => {
		return pathname === href;
	};

	return (
		<>
			<Link href={href} className={isActive() ? activeClassName : className}>
				{children}
			</Link>
		</>
	);
};

export default NavLink;
