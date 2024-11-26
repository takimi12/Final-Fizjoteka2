"use client";
import Link from "next/link";
import styles from "./breadcrumbs.module.scss";
import { usePathname } from "next/navigation";

function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}


function Breadcrumbs() {
    const pathname = usePathname();

    const cleanPathname = pathname?.startsWith("/")
        ? pathname.slice(1).replace(/-/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())
        : pathname?.replace(/-/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());

    return (
        <section className={`flex flex-col items-center`}>
            <div className={`${styles.locations} Container`}>
                <p className={`${styles.color}`}>
                    <Link className={`body-small ${styles.color}`} href="/">
                        Start &nbsp;
                    </Link>
                </p>
                <span className={styles.breadcrumb}>/</span>
                <p className={` `}>
                    &nbsp;
                    {cleanPathname}
                </p>
            </div>
        </section>
    );
}

export default Breadcrumbs;