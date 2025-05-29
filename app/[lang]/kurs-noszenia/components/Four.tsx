import styles from "./Four.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Four() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { kurs_noszenia: kursNoszenia } = dictionary;
	const { importance_of_carrying: importanceOfCarrying } = kursNoszenia;

	return (
		<>
			<section className={styles.Four}>
				<div className={`Container ${styles.container}`}>
					<div className={styles.top}>
						<h2>{importanceOfCarrying.title}</h2>
					</div>
					<div className={styles.textContainer}>
						{importanceOfCarrying.content.map((paragraphObj, index) => {
							const paragraph = Object.values(paragraphObj)[0];
							return <p key={index}>{paragraph}</p>;
						})}
					</div>
				</div>
			</section>
		</>
	);
}

export default Four;
