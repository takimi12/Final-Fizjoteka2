import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Five.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Five() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { kurs_noszenia: kursNoszenia } = dictionary;
	const { common_mistake: commonMistake } = kursNoszenia;

	return (
		<section className={styles.Ebook}>
			<div className={`${styles.container} Container`}>
				<div className={styles.topSection}>
					<h2>{commonMistake.title}</h2>
				</div>
				<div className={styles.bottomSection}>
					<div className={styles.inner}>
						<div className={styles.leftSection}>
							<div className={styles.image}>
								<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
							</div>
						</div>
						<div className={styles.rightSection}>
							<div className={styles.text}>
								<p>{commonMistake.problem}</p>
								{commonMistake.explanation.map((item, index) => {
									const text = Object.values(item)[0];
									return <p key={index}>{text}</p>;
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Five;
