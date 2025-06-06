import Image from "next/image";
import Photo from "../../../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Third.module.scss";
import { getPreferredLocale } from "../../../../../../helpers/getLocale";
import { getDictionary } from "../../../../../../lib/dictionary";

async function Third() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { rozwoj } = dictionary;
	const { third_section } = rozwoj;

	return (
		<>
			<section className={styles.Ebook}>
				<div className={`${styles.Container} Container`}>
					<div className={styles.topSection}>
						<h2 className={styles.textCenter}>{third_section.headline}</h2>
					</div>
					<div className={styles.bottomSection}>
						<div className={styles.Inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
									<h6 className={styles.question}>{third_section.question_title}</h6>
									{third_section.paragraphs.map((paragraph, index) => (
										<p key={index}>{paragraph}</p>
									))}
								</div>
							</div>
						</div>
						<div className={styles.rightSection}>
							<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Third;
