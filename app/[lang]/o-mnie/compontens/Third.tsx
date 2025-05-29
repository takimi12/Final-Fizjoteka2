import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Third.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Third() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);

	const methodsData = (dictionary as any).AboutMe?.AboutMePage?.MethodsSection;

	const title = methodsData?.title;
	const methods = methodsData?.methods || [];

	return (
		<section className={styles.Ebook}>
			<div className={`Container ${styles.Container}`}>
				<div className={styles.bottomSection}>
					<div className={styles.inner}>
						<div className={styles.leftSection}>
							<div className={styles.text}>
								<h2 className={styles.thirdTitle}>{title}</h2>
								<ul className={styles.ul}>
									{methods.map((method: string, index: number) => (
										<li key={index} className={styles.list}>
											<p>{method}</p>
										</li>
									))}
								</ul>
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
	);
}

export default Third;
