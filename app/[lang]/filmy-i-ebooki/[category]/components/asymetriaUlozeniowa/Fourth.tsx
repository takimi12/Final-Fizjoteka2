import Image from "next/image";
import Photo from "../../../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Fourth.module.scss";

async function Fourth() {
	return (
		<>
			<section className={styles.Ebook}>
				<div className={styles.Container}>
					<div className={styles.topSection}>
						<h2>Jak konkretnie mogę Ci pomóc?</h2>
						<h3>Przygotowałam zestaw materiałów na temat asymetrii.</h3>
					</div>
					<div className={styles.bottomSection}>
						<div className={styles.inner}>
							<div className={styles.leftSection}>
								<div className={styles.image}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={styles.rightSection}>
								<div className={styles.text}>
									<div>
										<div>
											<h6>PORADNIK (E-BOOK) PDF</h6>
											<ul>
												<li>ponad 90 stron praktycznych porad</li>
												<li>symetria i asymetria ciała</li>
												<li>konkretne metody wspierania prawidłowego rozwoju dziecka</li>
											</ul>
											<h6>WIDEO Z ĆWICZENIAMI W FORMIE ZABAWY</h6>
											<ul>
												<li>
													ponad godzina filmów instruktażowych z ćwiczeniami na asymetrię dla
													dziecka w pierwszym roku życia
												</li>
												<li>prezentacja ćwiczeń opisanych w e-booku</li>
											</ul>
											<h6>SPOTKANIE ONLINE</h6>
											<ul>
												<li>indywidualna konsultacja z fizjoterapeutą</li>
												<li>możliwość skonsultowania dodatkowych objawów u dziecka</li>
												<li>indywidualny dobór ćwiczeń</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Fourth;
