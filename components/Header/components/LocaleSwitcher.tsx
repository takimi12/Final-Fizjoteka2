"use client";

import styles from "./LocalSwitcher.module.scss";
import { i18n } from "../../../i18n";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BlogList } from "../../../app/[lang]/blog/components/BlogList";

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

        // Handling blog-specific paths
        if (pathname.startsWith("/blog") || pathname.startsWith("/en/blog")) {
            // Case 1: /blog -> /en/blog
            if (pathname === "/blog") {
                newPath = "/en/blog";
            }
            // Case 2: /en/blog -> /blog
            else if (pathname === "/en/blog") {
                newPath = "/blog";
            }
            // Case 3: /en/blog/[id] -> /en/blog
            else if (pathname.startsWith("/en/blog/")) {
                newPath = "/en/blog";
            }
            // Case 4: /blog/[id] -> /blog
            else if (pathname.startsWith("/blog/")) {
                newPath = "/blog";
            }
        } else {
            // Handle non-blog paths as before
            const hasLocale = i18n.locales.some(
                (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
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
        }

        router.push(newPath);
    };

    // Determine button text based on URL
    const isEnglishPath = pathname.includes("/en/");
    const buttonText = isEnglishPath ? "pl" : "en";
    
    // Set the opposite locale based on the current path
    const oppositeLocale = isEnglishPath ? "pl" : "en" as Locale;

    return (
        <div className={styles.wrapper}>
            <button onClick={() => handleLocaleChange(oppositeLocale)} className="">
                {buttonText}
            </button>
        </div>
    );
}