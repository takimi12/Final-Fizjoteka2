import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Six.module.scss";

async function Six() {
	return (
		<>
			<section className={styles.Six}>
				<div className={` Container ${styles.container}`}>
					<div className={styles.bottomSection}>
						<div className={styles.inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
									<h6 className={styles.mainHeading}>Konsultacja online</h6>

									<div className={styles.paragraphParent}>
										<p>
											Podczas wideorozmowy zbieram wywiad i ustalam jak pomóc dziecku oraz dobieram
											odpowiednią terapię i ćwiczenia dla rodzica.
										</p>
										<p className={styles.semibold}>
											Nauczę Cię prawidłowego sposobu noszenia oraz pielęgnacji dziecka.
										</p>
										<p>
											Nie jest to typowa wizyta, gdzie fizjoterapeuta ćwiczy, a Ty się przyglądasz.
											Celem konsultacji online jest nauczyć Cię ćwiczeń tak, byś to Ty rodzicu wziął
											odpowiedzialność za swoje dziecko.
										</p>
										<p className={styles.bold}>
											<span>
												Wystarczy nam jedna wizyta, by wybrać odpowiednie ćwiczenia dla dziecka.
												Ustalamy cele, a gdy je osiągniesz, umawiamy kolejną wizytę.
											</span>
										</p>
									</div>
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
			</section>
		</>
	);
}

export default Six;
