import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Ebook/ebook_product-title.webp";
import styles from "./Third.module.scss";

async function Third() {
	return (
		<section className={styles.Third}>
			<div className={`Container ${styles.container}`}>
				<div className={styles.topSection}>
					<h2>WIZYTA DOMOWA</h2>
					<h3 className={styles.bottomHeading}>
						Specjalizuję się w fizjoterapii niemowląt oraz dzieci z wadami postawy
					</h3>
				</div>
				<div className={styles.bottomSection}>
					<div className={styles.inner}>
						<div className={styles.leftSection}>
							<div className={styles.image}>
								<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
							</div>
						</div>
						<div className={styles.rightSection}>
							<div className={styles.mainHeading}>
								<h3>Jak przebiega wizyta</h3>
							</div>
							<div className={styles.text}>
								<ul>
									<li>Na pierwszej wizycie zbieram wywiad od rodzica i badam maluszka.</li>
									<li>Stawiam diagnozę i tłumaczę, jak mogę pomóc dziecku.</li>
									<li>
										Uczę rodzica prawidłowej pielęgnacji, czyli noszenia, podnoszenia, przewijania
										itp.
									</li>
									<li>Rozluźniam, masuję i ćwiczę z dzieckiem.</li>
									<li>
										Pokazuję ćwiczenia domowe dla rodzica i sprawdzam poprawność ich wykonania.
									</li>
								</ul>

								<b>
									Zależy mi na edukacji rodzica. Na konsultacji u mnie nauczysz się jak ćwiczyć z
									dzieckiem.
								</b>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Third;
