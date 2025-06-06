import Image from "next/image";
import Photo from "../../../../public/assets/Kurs-Noszenia/star.svg";
import styles from "./Nine.module.scss";
import Opinion from "../../../../components/repeated/opinie/page";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Nine() {
	const lang = getPreferredLocale() as "pl" | "en";
	const { WizytaPage } = await getDictionary(lang);
	const { TestimonialsSection } = WizytaPage;
	const { title, subtitle, rating } = TestimonialsSection;

	let variableOpinion = true;
	return (
		<>
			<section className={styles.nine}>
				<div className={`Container ${styles.container}`}>
					<div className={styles.textCenter}>
						<h2>{title}</h2>
						<h3>{subtitle}</h3>
					</div>
					<div className={styles.mediumSection}>
						<h6 className={styles.markHeading}>{rating}</h6>
						<div className={styles.stars}>
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
						</div>
						<Opinion variableOpinion={variableOpinion} />
					</div>
				</div>
			</section>
		</>
	);
}

export default Nine;
