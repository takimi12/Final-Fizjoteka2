import styles from "./Four.module.scss";

async function Four() {
	return (
		<>
			<section className={styles.Four}>
				<div className={`Container ${styles.container}`}>
					<div className={styles.top}>
						<h2>Dlaczego noszenie dziecka jest ważne?</h2>
					</div>
					<div className={styles.textContainer}>
						<p>
							Noworodek tuż po porodzie nie potrafi kontrolować swojego ciała w taki sposób, jak
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
