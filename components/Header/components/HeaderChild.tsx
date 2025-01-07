"use client";
import { useEffect, useState } from "react";
import DefaultHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { Locale } from "../../../i18n";

type Navigation = {
	home: string;
	blog: string;
	filmyIEbooki: string;
	kursNoszenia: string;
	fizQuiz: string;
	oMnie: string;
	wizyta: string;
};

export const HeaderComponent = ({
	navigation,
	lang,
}: {
	navigation: Navigation;
	lang: Locale;
}) => {
	const [isMobile, setIsMobile] = useState(false);


	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 901);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return <>{isMobile ? <MobileHeader /> : <DefaultHeader navigation={navigation} lang={lang} />}</>;
};
