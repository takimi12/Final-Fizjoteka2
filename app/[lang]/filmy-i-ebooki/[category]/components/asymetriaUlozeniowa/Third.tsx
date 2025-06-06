import styles from "./Third.module.scss";
import video from "../../../../../../public/assets/Filmy-i-ebooki/asymetria/Screenshot 2024-06-26 at 00.35.18.png";
import Image from "next/image";
import { getPreferredLocale } from "../../../../../../helpers/getLocale";
import { getDictionary } from "../../../../../../lib/dictionary";

async function Third() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { asymetria } = dictionary;
	const { Second } = asymetria;
	const { heading, content, image, sectionId } = Second;

	return (
		<section className={`${styles.third}`} id={sectionId}>
			<div className={`${styles.container} Container`}>
				<div className={styles.textWrapper}>
					<h2>{heading}</h2>
				</div>
				<div className={styles.parent}>
					<div className={styles.left}>
						<h6 className="mb-10">{content.subheading}</h6>
						<p>{content.paragraph}</p>
					</div>
					<div className={styles.right}>
						<Image src={video} alt={image.alt} />
					</div>
				</div>
			</div>
		</section>
	);
}

export default Third;
