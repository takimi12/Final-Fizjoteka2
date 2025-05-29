import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Third.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Third() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { kurs_noszenia: kursNoszenia } = dictionary;

	const {
		course_goal: courseGoal
	} = kursNoszenia;
	
	// @ts-ignore
	const { title, heading, topics, description } = courseGoal;

	return (
		<>
			<section className={styles.Ebook}>
				<div className="Container">
					<div className={styles.topSection}>
						<h2 className="">
							{title}
						</h2>
					</div>
					<div className={styles.bottomSection}>
						<div className={styles.Inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
									<h6>{heading}</h6>
									<ul>
										{topics.map((topic, index) => (
											<li key={index}>
												<p>{topic}</p>
											</li>
										))}
									</ul>
									<p>
										{description}
									</p>
								</div>
							</div>
						</div>
						<div className={styles.rightSection}>
							<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Third;