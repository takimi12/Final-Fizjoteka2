import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Second.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Second() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { kurs_noszenia: kursNoszenia } = dictionary;

	const {
		about_author: {
			greeting,
			name,
			profession,
			education,
			workplace,
			description
		}
	} = kursNoszenia;

	return (
		<>
			<section className={styles.second} id="info">
				<div className="Container">
					<div className={styles.topSection}>
						<h2>{greeting}</h2>
						<h3 className={styles.bottomText}>{name}</h3>
					</div>
					<div className={styles.bottomSection}>
						<div className={styles.Inner}>
							<div className={styles.leftSection}>
								<div className={styles.image}>
									<Image src={Photo} alt="moj pierwszy ebook" width={408} height={292} />
								</div>
							</div>
							<div className={styles.rightSection}>
								<div className={styles.text}>
									<h6>{profession}</h6>
									<p>
										{education}  {workplace}
									</p>
									<p>
										{description}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Second;