import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";
import Image from "next/image";
import TopFooter from "./components/TopSection";
import { getPreferredLocale } from "../../helpers/getLocale";
import { getDictionary } from "../../lib/dictionary";
import { SOCIAL_ICONS } from "../../app/address/adress";

const Footer = async () => {
	const lang = getPreferredLocale() as "pl" | "en";

	const { Footer } = (await getDictionary(lang)) as {
		Footer: {
			policy: string;
			regulations: string;
		};
	};

	return (
		<>
			<TopFooter />

			<footer className={` ${styles.footer}`}>
				<div className={` ${styles.container} Container`}>
					<div className={` ${styles.inner}`}>
						<span>mgr Magdalena Adaś</span>
						<span>magdalena.adas@gmail.com</span>
					</div>
					<div className={`${styles.inner} `}>
						<Link href="">{Footer.policy}</Link>
						<Link href="">{Footer.regulations}</Link>
					</div>

					<div className={`${styles.icons}  `}>
						{SOCIAL_ICONS.map(({ href, icon, alt }) => (
							<Link href={href} key={alt}>
								<Image src={icon} width={25} height={25} alt={alt} />
							</Link>
						))}
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
