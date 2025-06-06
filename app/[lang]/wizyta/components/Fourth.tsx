import styles from "./Fourth.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Four() {
	const lang = getPreferredLocale() as "pl" | "en";
	const { WizytaPage } = await getDictionary(lang);
	const { WhatMakesMeDifferent } = WizytaPage;
	const { title, points } = WhatMakesMeDifferent;

	return (
		<section className={styles.four}>
			<div className={`Container ${styles.container}`}>
				<div className={styles.mainWrapper}>
					<h2 className={styles.mainHeading}>{title}</h2>
					<ol>
						{points.map((point: string, index: number) => (
							<li key={index}>
								{index + 1}.{point}
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}

export default Four;
