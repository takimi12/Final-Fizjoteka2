import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Seven.module.scss";

async function Six() {
	return (
		<>
			<section className={styles.Ebook}>
				<div className={`${styles.container} Container`}>
					<div className={styles.topSection}>
						<h2>Jak konkretnie mogę Ci pomóc?</h2>
						<h3>Przygotowałam zestaw filmów o noszeniu i opiece nad niemowlakiem</h3>
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
										<h6>Jak podnosić niemowlę?</h6>
										<ul>
											<li>Podnoszenie noworodka bokiem.</li>
											<li>Podnoszenie noworodka z łóżeczka.</li>
											<li>Czy podnoszenie noworodka pod paszki jest bezpieczne?</li>
											<li>Do kiedy podtrzymywać główkę?</li>
										</ul>

										<h6>Podnoszenie noworodka po karmieniu</h6>
										<ul>
											<li>Jak przełożyć dziecko do drugiej piersi?</li>
											<li>Pozycje do karmienia dziecka.</li>
											<li>Pozycje do odbicia dziecka.</li>
										</ul>

										<h6>Jak przewinąć dziecko?</h6>
										<ul>
											<li>Porady od fizjoterapeuty, jak zrobić to sprawnie.</li>
											<li>Dlaczego nie ciągniemy dziecko za nóżki?</li>
										</ul>
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

export default Six;
