import Image from "next/image";
import Photo from "../../../../public/assets/Kurs-Noszenia/star.svg";
import styles from "./Eight.module.scss";
import Opinion from "../../../../components/repeated/opinie/page";
import { getDictionary } from "../../../../lib/dictionary";
import { getPreferredLocale } from "../../../../helpers/getLocale";

type StatItem = {
	number: string;
	description: string;
};

async function Eight() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { trustMe } = dictionary.kurs_noszenia;

	return (
		<>
			<section className={styles.eight}>
				<div className={`Container ${styles.container}`}>
					<div className={styles.textStyle}>
						<h2>{trustMe.header}</h2>
						<h3>{trustMe.subheader}</h3>
						<div className={styles.blockParent}>
							{trustMe.stats.map((item: StatItem, index: number) => (
								<div className={styles.inner} key={index}>
									<h5>{item.number}</h5>
									<p>{item.description}</p>
								</div>
							))}
						</div>
					</div>
					<div className={styles.mediumSection}>
						<h3>{trustMe.opinionSection.title}</h3>
						<h6>{trustMe.opinionSection.thankYouNote}</h6>
						<h6>{trustMe.opinionSection.rating}</h6>
						<div className={styles.stars}>
							{[...Array(5)].map((_, i: number) => (
								<Image
									key={i}
									src={Photo}
									alt={trustMe.opinionSection.altText}
									width={20}
									height={20}
								/>
							))}
						</div>
						<Opinion variableOpinion={false} />
					</div>
				</div>
			</section>
		</>
	);
}

export default Eight;
