import React from "react";
import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Ebook/ebook_product-title.webp";
import styles from "./Third.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Third() {
	const lang = getPreferredLocale() as "pl" | "en";
	const { WizytaPage } = await getDictionary(lang);
	const { HomeVisitSection } = WizytaPage;
	const { title, subtitle, howItWorks } = HomeVisitSection;
	const { title: howItWorksTitle, steps, emphasis } = howItWorks;

	return (
		<section className={styles.Third}>
			<div className={`Container ${styles.container}`}>
				<div className={styles.topSection}>
					<h2>{title}</h2>
					<h3 className={styles.bottomHeading}>{subtitle}</h3>
				</div>
				<div className={styles.bottomSection}>
					<div className={styles.inner}>
						<div className={styles.leftSection}>
							<div className={styles.image}>
								<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
							</div>
						</div>
						<div className={styles.rightSection}>
							<div className={styles.mainHeading}>
								<h3>{howItWorksTitle}</h3>
							</div>
							<div className={styles.text}>
								<ul>
									{steps.map((step, i) => (
										<li key={i}>{step}</li>
									))}
								</ul>
								<b>{emphasis}</b>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Third;
