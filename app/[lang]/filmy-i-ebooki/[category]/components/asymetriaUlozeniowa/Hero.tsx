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
	const {
		Hero: {
			title,
			subtitle,
			description,
			buttons,
			image: { alt }
		}
	} = dictionary.asymetria;

	return (
		<section className={`${styles.Hero} Container`}>
			<div className={styles.Container}>
				<Breadcrumbs />
				<div className={styles.bottomSection}>
					<div className={styles.Inner}>
						<div className={styles.leftSection}>
							<div className={styles.text}>
								<h2>{title}</h2>
								<p className={styles.paragraph}>{subtitle}</p>
								<p>{description}</p>
							</div>
							<div className={styles.buttonGroup}>
								{buttons.map((button, index) => (
									<div className={styles.button} key={index}>
										<Link href={button.link}>
											<button className={button.type === "primary" ? "Button" : "secondaryButton"}>
												{button.label}
											</button>
										</Link>
									</div>
								))}
							</div>
						</div>
						<div className={styles.rightSection}>
							<div className={styles.image}>
								<Image src={Photo} alt={alt} width={361} height={322} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
