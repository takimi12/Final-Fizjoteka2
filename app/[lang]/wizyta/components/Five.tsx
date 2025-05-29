import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Five.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Five() {
	const lang = getPreferredLocale() as "pl" | "en";
	const { WizytaPage } = await getDictionary(lang);
	const { MethodsSection } = WizytaPage;
	const { title, methods } = MethodsSection;

	return (
		<>
			<section className={styles.ebook}>
				<div className={`Container ${styles.container}`}>
					<div className={styles.text}>
						<h6 className={styles.mainHeading}>{title}</h6>
					</div>
					<div className={styles.bottomSection}>
						<div className={styles.leftSection}>
							<ul>
								{methods.map((method: string, index: number) => (
									<li key={index} className={styles.list}>
										{method}
									</li>
								))}
							</ul>
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

export default Five;