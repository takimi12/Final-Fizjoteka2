import React from "react";
import styles from "./Eight.module.scss";
import { getPreferredLocale } from "../../../../../../helpers/getLocale";
import { getDictionary } from "../../../../../../lib/dictionary";

async function Eight() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { rozwoj } = dictionary;
	const { title, subtitle, sections } = rozwoj.fourth;

	return (
		<section className={styles.tvelve}>
			<div className={`Container ${styles.container}`}>
				<div className={styles.header}>
					<h2>{title}</h2>
					<h6 className={styles.subtitle}>{subtitle}</h6>
				</div>
				<div className={styles.wraper}>
					{sections.map((section, index) => (
						<div key={index} className={styles.card}>
							<h5>{section.heading}</h5>
							<ul className={styles.ul}>
								{section.points.map((point: string, pointIndex: number) => (
									<li key={pointIndex} className={styles.point}>
										{point}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Eight;
