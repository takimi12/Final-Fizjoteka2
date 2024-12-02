import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Four.module.scss";
import Link from "next/link";

async function Four() {
	return (
		<>
			<section className={`${styles.Four} `}>
				<div className={`Container m-auto`}>
					<div className={` ${styles.top} flex justify-center`}>
						<h2> Dlaczego noszenie dziecka jest ważne?</h2>
					</div>
					<div className={`flex flex-col gap-10`}>
						<p>
							{" "}
							Noworodek tuż po porodzie nie potrafi kontrolować swojego siała w taki sposób, jak
							osoby dorosłe. Dlatego na podstawie tego, co mu serwujemy każdego dnia, uczy się
							wzorców ruchowych. To od nas zależy czy te wzorce będą prawidłowe, czy też nie.
						</p>

						<p>
							Znając podstawy prawidłowej pielęgnacji niemowląt możemy już od pierwszych dni życia
							wspierać naszego maluszka w dalszym rozwoju. Wykonując prawidłowo czynności
							pielęgnacyjne, maluszek nie musi się napinać i denerwować, gdyż nie traci gwałtownie
							płaszczyzny podparcia oraz sam pomaga w tych aktywnościach.
						</p>

						<p>
							Pielęgnacja dopasowana do wieku i możliwości dziecka znacznie ułatwia mu naukę
							kolejnych umiejętności, a także pomaga przystosować się do życia w nowych warunkach.
						</p>
					</div>
				</div>
			</section>
		</>
	);
}

export default Four;
