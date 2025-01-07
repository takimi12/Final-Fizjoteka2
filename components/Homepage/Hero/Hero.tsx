import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Photo from "../../../public/assets/HomePage/Hero/helloSection_magda.webp";
import styles from "./Hero.module.scss";
import { getPreferredLocale } from "../../../helpers/getLocale";
import { getDictionary } from "../../../lib/dictionary";

async function Hero() {
	const lang = getPreferredLocale() as "pl" | "en";
	const { Homepage } = await getDictionary(lang);
	const {
		Hero: { title, description1, description2 },
	} = Homepage;

	return (
		<section className={`${styles.Hero}`}>
			<div className={`Container`}>
				<div className={` ${styles.Inner}`}>
					<div className={` ${styles.leftSection}`}>
						<div className={`${styles.title}`}>
							<h1 className={` ${styles.main}`}>{title}</h1>
						</div>
						<p className={`${styles.paragraph}`}>{description1}</p>
						<p className={`${styles.paragraph}`}>{description2}</p>
					</div>
					<div className={` ${styles.rightSection}`}>
						<Image src={Photo} width={408} height={404} alt="alt" aria-label="al" />
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
