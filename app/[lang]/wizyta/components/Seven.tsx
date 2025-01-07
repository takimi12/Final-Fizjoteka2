import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Seven.module.scss";

async function Seven() {
	return (
		<>
			<section className={styles.seven}>
				<div className={` Container ${styles.container}`}>
					<div className={styles.text}>
						<h6 className={styles.mainHeading}>Jak przebiega konsultacja online?</h6>

						<div className={styles.bottomSection}>
							<div className={styles.leftSection}>
								<div className={styles.inner}>
									<div className={styles.listContainer}>
										<ul>
											<li className={styles.list}>
												Konsultacja online odbywa się w formie wideorozmowy.
											</li>
											<li className={styles.list}>
												Przed konsultacją proszę rodzica o przesłanie filmów koniecznych do oceny
												dziecka.
											</li>
											<li className={styles.list}>
												Podczas wideorozmowy możesz skonsultować problem swojego dziecka, uzyskasz
												rzetelne informacje, pokażę Ci ćwiczenia na profesjonalnej lalce
												instruktażowej, sprawdzę poprawność wykonywanych ćwiczeń, prześlę potrzebne
												materiały, a podczas kolejnych konsultacji monitoruję postępy dziecka.
											</li>
										</ul>
										<b>
											Po wizycie otrzymasz dodatkowe materiały i film, by samodzielnie ćwiczyć z
											dzieckiem w domu.
										</b>
									</div>
								</div>
							</div>

							<div className={styles.rightSection}>
								<div className={styles.image}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Seven;
