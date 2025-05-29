import Link from "next/link";
import styles from "./Ten.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Ten() {
	const lang = getPreferredLocale() as "pl" | "en";
	const { WizytaPage } = await getDictionary(lang);
	const { PricingSection } = WizytaPage;
	const { title, consultations } = PricingSection;

	return (
		<section className={styles.ten}>
			<div className={` Container ${styles.container}`}>
				<h2 className={styles.title}>{title}</h2>
				<div className={styles.wraper}>
					{consultations.map((consultation: any, index: number) => (
						<div key={index} className={styles.consultationSingle}>
							<h3 className={styles.consulationHeading}>{consultation.type}</h3>
							<p className={styles.consultationPrice}>{consultation.price}</p>
							<ul className={styles.ul}>
								{consultation.features.map((feature: string, featureIndex: number) => (
									<li 
										key={featureIndex} 
										className={feature.includes("Otrzymasz zestaw") || feature.includes("Zalecenia domowe") ? styles.bold : ""}
									>
										{feature}
									</li>
								))}
							</ul>
							<Link href="https://widget.zarezerwuj.pl/direct/b02f996b-e919-4357-8c78-99b006488d85">
								<button className={styles.bookLink}>{consultation.button}</button>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Ten;