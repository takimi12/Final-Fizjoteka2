import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Seven.module.scss";
import { getDictionary } from "../../../../lib/dictionary";
import { getPreferredLocale } from "../../../../helpers/getLocale";

async function Seven() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { help_offer } = dictionary.kurs_noszenia;

	return (
		<>
			<section className={styles.Ebook}>
				<div className={styles.Container}>
					<div className={styles.topSection}>
						<h2>{help_offer.title}</h2>
						<h3>{help_offer.subtitle}</h3>
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
									<div>
										{Object.entries(help_offer.sections).map(([key, section]) => (
											<div key={key}>
												<h6>{section.title}</h6>
												<ul>
													{section.topics.map((topic: any, index: number) => {
														const rawValue =
															typeof topic === "string" ? topic : Object.values(topic)[0];
														const topicText =
															typeof rawValue === "string" ? rawValue : String(rawValue);
														return <li key={index}>{topicText}</li>;
													})}
												</ul>
											</div>
										))}
									</div>
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
