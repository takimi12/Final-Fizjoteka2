import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Five.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Five() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);

	const onlineData = (dictionary as any).AboutMe?.AboutMePage?.OnlineActivitySection;

	if (!onlineData) return null;

	const { title, description1, description2, description3 } = onlineData;

	return (
		<section className={styles.Ebook}>
			<div className={`Container ${styles.Container}`}>
				<div className={styles.bottomSection}>
					<div className={styles.Inner}>
						<div className={styles.leftSection}>
							<div className={styles.text}>
								<div className={styles.title}>
									<h2>{title}</h2>
								</div>
								<div>
									<p>{description1}</p>
									<p>{description2}</p>
									<p>{description3}</p>
								</div>
							</div>
						</div>
						<div className={styles.rightSection}>
							<div className={styles.image}>
								<Image src={Photo} alt="działalność online" width={361} height={322} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Five;
