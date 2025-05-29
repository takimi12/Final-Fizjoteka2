import Image from "next/image";
import styles from "./Nine.module.scss";
import photo from "../../../../public/assets/Kurs-Noszenia/guarantee1.svg";
import photo1 from "../../../../public/assets/Kurs-Noszenia/guarantee2.svg";
import { getDictionary } from "../../../../lib/dictionary";
import { getPreferredLocale } from "../../../../helpers/getLocale";

async function Nine() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { guarantees } = dictionary.kurs_noszenia;

	const images = [photo, photo1, photo]; 

	return (
		<section className={`${styles.Nine}`}>
			<div className="Container">
				<div className={styles.topSection}>
					<h2>{guarantees.title}</h2>
					<p>{guarantees.subtitle}</p>
				</div>
				<div className={styles.itemWraper}>
					{guarantees.benefits.map((item, index) => (
						<div key={index} className={styles.bottomItem}>
							<div className="iconBox">
								<Image width={25} height={25} src={images[index]} alt="guarantee icon" />
							</div>
							<h3>{item.title}</h3>
							<p className={styles.paragraph}>{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Nine;
