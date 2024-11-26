import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Seven.module.scss";
import Link from "next/link";

async function Seven() {
	return (
		<>
			<section className={`${styles.Ebook} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.topSection} flex flex-col items-center `}>
						<h2>Jak konkretnie mogę Ci pomóc?</h2>
						<h3>Przygotowałam zestaw filmów o noszeniu i opiece nad niemowlakiem</h3>
					</div>
					<div className={`${styles.bottomSection} flex  items-center mt-20`}>
						<div className={`${styles.inner} flex w-full items-center gap-10`}>
							<div className={`${styles.leftSection} w-full`}>
								<div className={`${styles.image} flex justify-center`}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={`${styles.rightSection} flex w-full flex-col justify-center gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
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

export default Seven;
