import React from "react";
import styles from "./Six.module.scss";
import { getPreferredLocale } from "../../../../../../helpers/getLocale";
import { getDictionary } from "../../../../../../lib/dictionary";

async function Six() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { asymetria } = dictionary;
	const { Fourth } = asymetria;

	return (
		<section className={styles.tvelve}>
			<div className={`${styles.container} Container`}>
				<div className={styles.textCenter}>
					<h2>{Fourth.title}</h2>
					<h6 className={styles.subtitle}>{Fourth.subtitle}</h6>
				</div>
				<div className={styles.wraper}>
					{Fourth.chapters.map((item, index) => (
						<div key={index} className={styles.card}>
							<h6 className={styles.chapter}>{item.chapter}</h6>
							<h5 className={styles.title}>{item.title}</h5>
							<ul className={styles.ul}>
								{item.points.map((point, idx) => (
									<li className={styles.point} key={idx}>
										<span className={styles.pointer}>{point}</span>
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

export default Six;
