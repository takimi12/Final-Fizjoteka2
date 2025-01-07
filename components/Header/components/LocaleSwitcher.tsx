"use client";

import styles from "./LocalSwitcher.module.scss";
import { i18n } from "../../../i18n";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; 

type Locale = (typeof i18n.locales)[number];


const setCookie = (name: string, value: string, days: number) => {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
	return "";
};

export default function LocaleSwitcher() {
	const [currentLocale, setCurrentLocale] = useState<Locale>(i18n.defaultLocale);
	const router = useRouter(); 
	const pathname = usePathname(); 

	useEffect(() => {

		const savedLocale = getCookie("preferredLocale");
		if (savedLocale && i18n.locales.includes(savedLocale as Locale)) {
			setCurrentLocale(savedLocale as Locale);
		}
	}, []);

	const handleLocaleChange = (newLocale: Locale) => {
		setCurrentLocale(newLocale);
		setCookie("preferredLocale", newLocale, 365);

		let newPath = "";

		const hasLocale = i18n.locales.some(
			(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
		);

		if (hasLocale) {
			const pathParts = pathname.split("/");
			if (newLocale === i18n.defaultLocale) {
				pathParts.splice(1, 1);
				newPath = pathParts.join("/") || "/";
			} else {
				pathParts[1] = newLocale;
				newPath = pathParts.join("/");
			}
		} else {
			if (newLocale === i18n.defaultLocale) {
				newPath = pathname;
			} else {
				newPath = `/${newLocale}${pathname}`;
			}
		}

		router.push(newPath); 
	};


	const oppositeLocale = i18n.locales.find((locale) => locale !== currentLocale) as Locale;

	return (
		<div className={styles.wrapper}>
			{oppositeLocale && (
				<button onClick={() => handleLocaleChange(oppositeLocale)} className="">
					{oppositeLocale}
				</button>
			)}
		</div>
	);
}
