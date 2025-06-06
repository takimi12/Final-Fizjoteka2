import React from "react";
import lightBulb from "../../../../public/assets/Kurs-Noszenia/Ten/lightBulb.svg";
import Image from "next/image";
import styles from "./Ten.module.scss";
import Buble1 from "./../../../../public/assets/Kurs-Noszenia/Ten/Buble1.svg";
import Buble2 from "./../../../../public/assets/Kurs-Noszenia/Ten/Buble2.svg";
import Buble3 from "./../../../../public/assets/Kurs-Noszenia/Ten/Buble3.svg";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Ten() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { faq } = dictionary.kurs_noszenia;

	return (
		<>
			<section className={styles.asked}>
				<div className={styles.bubbleWrapper}>
					<div className={styles.bubbleWrapper1}>
						<Image className={styles.buble1} src={Buble1} alt="Buble1" width={125} height={125} />
					</div>
					<div className={`${styles.bubbleWrapper1} ${styles.bubbleWrapper2}`}>
						<Image className={styles.buble2} src={Buble2} alt="Buble2" width={125} height={125} />
					</div>
					<div className={styles.bubbleWrapper1}>
						<Image className={styles.buble3} src={Buble3} alt="Buble3" width={125} height={125} />
					</div>
				</div>
				<div className={`${styles.container} Container`}>
					<h2 className={styles.title}>{faq.title}</h2>
					<div className={styles.wrapper}>
						{faq.questions.map((item, index) => (
							<div className={styles.single} key={index}>
								<div className={styles.cardItem}>
									<div className={styles.iconWrapper}>
										<Image width={30} height={30} src={lightBulb} alt="Light Bulb Icon" />
									</div>
									<h4>{item.question}</h4>
								</div>
								<div className={styles.cardItem}>
									<p>{item.answer}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default Ten;
