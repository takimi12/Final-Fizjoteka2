import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Hero/helloSection_magda.webp";
import styles from "./Hero.module.scss";
import Breadcrumbs from "../../../../components/breadcrumbs/breadcrumbs";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Hero() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);

	const aboutMeData = (dictionary as any).AboutMe?.AboutMePage?.Hero;

	const title = aboutMeData?.title;
	const description1 = aboutMeData?.description1;
	const description2 = aboutMeData?.description2;
	const description3 = aboutMeData?.description3;

	return (
		<>
			<section className={styles.breadcrumbs}>
				<div className="Container">
					<Breadcrumbs />
				</div>
			</section>
			<section className={`${styles.Hero}`}>
				<div className={`Container `}>
					<div className={`${styles.Inner}`}>
						<div className={` ${styles.leftSection}`}>
							<div className={` ${styles.title}`}>
								<h1>{title}</h1>
							</div>
							<p className={`${styles.paragraph}`}>{description1}</p>
							<p className={`font-bold ${styles.paragraph}`}>{description2}</p>
							<p className={`${styles.paragraph}`}>{description3}</p>
						</div>
						<div className={` ${styles.rightSection}`}>
							<Image
								src={Photo}
								width={408}
								height={404}
								alt="Zdjęcie Magdy, autorki bloga"
								aria-label="Zdjęcie Magdy, autorki bloga"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Hero;
