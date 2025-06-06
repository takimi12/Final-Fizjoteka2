import Link from "next/link";
import styles from "./Eight.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Eight() {
	const lang = getPreferredLocale() as "pl" | "en";
	const { WizytaPage } = await getDictionary(lang);
	const { OnlineVsStationaryDifferences } = WizytaPage;
	const { title, differences, additionalInfo } = OnlineVsStationaryDifferences;

	return (
		<>
			<section className={styles.eight}>
				<div className={`Container ${styles.container}`}>
					<div>
						<h2 className={styles.mainHeading}>{title}</h2>
						<ol>
							{differences.map((difference: string, index: number) => (
								<li key={index} className={styles.list}>
									{index + 1}.{difference}
								</li>
							))}
						</ol>
						<div className={styles.span}>
							<b>
								{additionalInfo.split("tutaj")[0]}
								<Link
									className={styles.link}
									target="_blank"
									rel="noopener noreferrer"
									href="https://docs.google.com/document/d/1P9Iu4Wrn1o65wqPszzBi_q-X4GAZIWR-XfR0VdGBavE"
								>
									tutaj
								</Link>
								{additionalInfo.split("tutaj")[1] || ""}
							</b>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Eight;
