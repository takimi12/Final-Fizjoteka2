import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Six.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Six() {
	const lang = getPreferredLocale() as "pl" | "en";
	const { WizytaPage } = await getDictionary(lang);
	const { OnlineConsultationSection } = WizytaPage;
	const { title, description1, emphasis1, description2, emphasis2 } = OnlineConsultationSection;

	return (
		<>
			<section className={styles.Six}>
				<div className={` Container ${styles.container}`}>
					<div className={styles.bottomSection}>
						<div className={styles.inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
									<h6 className={styles.mainHeading}>{title}</h6>

									<div className={styles.paragraphParent}>
										<p>{description1}</p>
										<p className={styles.semibold}>{emphasis1}</p>
										<p>{description2}</p>
										<p className={styles.bold}>
											<span>{emphasis2}</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.rightSection}>
							<div className={styles.image}>
								<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Six;
