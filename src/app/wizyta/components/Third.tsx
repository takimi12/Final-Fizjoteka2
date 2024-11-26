import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Ebook/ebook_product-title.webp";
import styles from "./Third.module.scss";


async function Second() {
	return (
		<>
			<section className={`${styles.Third} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.topSection} flex flex-col items-center`}>
						<h2>WIZYTA DOMOWA</h2>
						<h3 className={` ${styles.bottomHeading}`}>Specjalizuję się w fizjoterapii niemowląt oraz dzieci z wadami postawy</h3>
					</div>
					<div className={`${styles.bottomSection} flex  items-center`}>
						<div className={`${styles.inner} flex items-center`}>
							<div className={`${styles.leftSection} w-full`}>
								<div className={`${styles.image} flex justify-center`}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={`${styles.rightSection} flex w-full flex-col  gap-3`}>
								<div className={`font-bold`}>
									<h3 className={` ${styles.mainHeading}`}>Jak przebiega wizyta</h3>
								</div>
								<div className={`${styles.text} flex flex-col gap-3`}>
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
		</>
	);
}

export default Second;
