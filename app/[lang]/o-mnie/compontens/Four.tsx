import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Ebook/ebook_product-title.webp";
import styles from "./Four.module.scss";
import Link from "next/link";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

export default async function Four() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);

	const ebookData = (dictionary as any).AboutMe?.AboutMePage?.EbookSection;

	if (!ebookData) return null;

	const { title, subtitle, description1, description2, button } = ebookData;

	return (
		<section className={styles.Four}>
			<div className={`Container ${styles.Container}`}>
				<div className={styles.topSection}>
					<h2>{title}</h2>
					<h3 className={styles.lowHeading}>{subtitle}</h3>
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
								<p>{description1}</p>
								<p>{description2}</p>
							</div>
							<div className="button">
								<Link href={button?.link || "#"}>
									<button>{button?.text}</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
