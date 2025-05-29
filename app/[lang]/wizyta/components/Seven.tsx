import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Seven.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Seven() {
	const lang = getPreferredLocale() as "pl" | "en";
	const { WizytaPage } = await getDictionary(lang);
	const { HowOnlineConsultationWorks } = WizytaPage;
	const { title, steps, emphasis } = HowOnlineConsultationWorks;

	return (
		<>
			<section className={styles.seven}>
				<div className={` Container ${styles.container}`}>
					<div className={styles.text}>
						<h6 className={styles.mainHeading}>{title}</h6>

						<div className={styles.bottomSection}>
							<div className={styles.leftSection}>
								<div className={styles.inner}>
									<div className={styles.listContainer}>
										<ul>
											{steps.map((step: string, index: number) => (
												<li key={index} className={styles.list}>
													{step}
												</li>
											))}
										</ul>
										<b>
											{emphasis}
										</b>
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
				</div>
			</section>
		</>
	);
}

export default Seven;