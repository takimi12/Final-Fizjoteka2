import Image from "next/image";
import styles from "./Hero.module.scss";
import Breadcrumbs from "../../../../../../components/breadcrumbs/breadcrumbs";
import Photo from "../../../../../../public/assets/Kurs-Noszenia/noszenie_maluszka.webp";
import Link from "next/link";
import { getPreferredLocale } from "../../../../../../helpers/getLocale";
import { getDictionary } from "../../../../../../lib/dictionary";

async function Hero() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { rozwoj } = dictionary;

	const {
		title,
		subheadline,
		description,
		buttons
	} = rozwoj.hero_section;

	return (
		<>
			<section className={styles.Hero}>
				<div className={`Container ${styles.Container}`}>
					<Breadcrumbs />
					<div className={styles.bottomSection}>
						<div className={styles.Inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
									<h2>{title}</h2>
									<p className={styles.paragraph}>{subheadline}</p>
									<p>{description}</p>
								</div>
								<div className={styles.buttonContainer}>
									<div className={styles.button}>
										<Link href="#info">
											<button className={styles.secondaryButton}>{buttons[0]}</button>
										</Link>
									</div>
									<div className={styles.button}>
										<Link href="#products">
											<button className={styles.primaryButton}>{buttons[1]}</button>
										</Link>
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

export default Hero;
