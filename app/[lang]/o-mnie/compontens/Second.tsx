import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Ebook/ebook_product-title.webp";
import styles from "./Second.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Second() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);

	const patientsData = (dictionary as any).AboutMe?.AboutMePage?.PatientsSection;

	const title = patientsData?.title;
	const subtitle = patientsData?.subtitle;
	const locationTitle = patientsData?.locationTitle;
	const description1 = patientsData?.description1;
	const description2 = patientsData?.description2;
	const description3 = patientsData?.description3;

	return (
		<section className={styles.second}>
			<div className={`Container ${styles.Container}`}>
				<div className={styles.bottomSection}>
					<div className={styles.topSection}>
						<h2>{title}</h2>
						<h6 className={styles.smaller}>{subtitle}</h6>
					</div>
					<div className={styles.inner}>
						<div className={styles.leftSection}>
							<div className={styles.image}>
								<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
							</div>
						</div>
						<div className={styles.rightSection}>
							<div className={styles.title}>
								<h3 className={styles.smallerTitle}>{locationTitle}</h3>
							</div>
							<div className={styles.text}>
								<p>{description1}</p>
								<p>{description2}</p>
								<p>{description3}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Second;
