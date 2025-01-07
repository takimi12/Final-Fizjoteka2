"use client";
import Link from "next/link";
import styles from "./breadcrumbs.module.scss";
import { usePathname } from "next/navigation";
import React from "react";

function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function Breadcrumbs() {
	const pathname = usePathname();

	const segments = pathname?.slice(1).split("/") || [];

	const hasEnPrefix = segments[0] === "en";
	const filteredSegments = hasEnPrefix ? segments.slice(1) : segments;
	const breadcrumbs = filteredSegments.map((segment, index) => {
		let href;
		if (hasEnPrefix) {
			href = index === 0 ? "/en" : "/" + segments.slice(0, index + 2).join("/");
		} else {
			href = "/" + segments.slice(0, index + 1).join("/");
		}

		return {
			text: segment.replace(/-/g, " ").replace(/\b\w/g, (match) => match.toUpperCase()),
			href: href,
		};
	});

	return (
		<section className={`flex flex-col items-center`}>
			<div className={`${styles.locations} Container`}>
				<p className={`${styles.color}`}>
					<Link className={`body-small ${styles.color}`} href={hasEnPrefix ? "/en" : "/"}>
						Start &nbsp;
					</Link>
				</p>
				{breadcrumbs.map((crumb, index) => (
					<React.Fragment key={crumb.href}>
						<span className={styles.breadcrumb}>/</span>
						<p className={` `}>
							&nbsp;
							<Link className={`body-small ${styles.color}`} href={`${pathname}`}>
								{crumb.text}
							</Link>
							{index < breadcrumbs.length - 2 ? " / " : ""}
						</p>
					</React.Fragment>
				))}
			</div>
		</section>
	);
}

export default Breadcrumbs;
