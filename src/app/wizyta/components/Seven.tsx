import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Seven.module.scss";


async function Six() {
	return (
		<>
			<section className={`${styles.seven} d-flex flex-center`}>
				<div className={`Container m-auto`}>
				<div className={`${styles.text} flex flex-col gap-3`}>
									<h6 className={` ${styles.mainHeading}`}>Jak przebiega konsultacja online?</h6>

									<div className={` ${styles.bottomSection}`}>
						<div className={` w-full`}>
					<div className={` flex  items-center`}>
						<div className="Inner flex items-center">
							<div className={`${styles.leftSection} flex w-full flex-col justify-center gap-3`}>
								
										<div>
											<ul>
												<li className={` ${styles.list} `}>
													Konsultacja online odbywa się w formie wideorozmowy.
												</li>
												<li className={` ${styles.list} `}>
													Przed konsultacją proszę rodzica o przesłanie filmów koniecznych do oceny
													dziecka.
												</li>
												<li className={` ${styles.list} `}>
													Podczas wideorozmowy możesz skonsultować problem swojego dziecka, uzyskasz
													rzetelne informacje, pokażę Ci ćwiczenia na profesjonalnej lalce
													instruktażowej, sprawdzę poprawność wykonywanych ćwiczeń, prześlę
													potrzebne materiały, a podczas kolejnych konsultacji monitoruję postępy
													dziecka.
												</li>
											</ul>
											<b>
												Po wizycie otrzymasz dodatkowe materiały i film, by samodzielnie ćwiczyć z
												dzieckiem w domu.
											</b>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={`${styles.rightSection} w-full`}>
							<div className={`${styles.image} flex justify-center`}>
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

export default Six;
