import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Second.module.scss";

async function Second() {
	return (
		<>
			<section className={styles.second} id="info">
				<div className="Container">
					<div className={styles.topSection}>
						<h2>Cześć!</h2>
						<h3 className={styles.bottomText}>Nazywam sie Magdalena Adas</h3>
					</div>
					<div className={styles.bottomSection}>
						<div className={styles.Inner}>
							<div className={styles.leftSection}>
								<div className={styles.image}>
									<Image src={Photo} alt="moj pierwszy ebook" width={408} height={292} />
								</div>
							</div>
							<div className={styles.rightSection}>
								<div className={styles.text}>
									<h6>Jestem fizjoterapeutką dziecięcą i edukatorką.</h6>
									<p>
										Ukończyłam Collegium Medicum Uniwersytetu Jagiellońskiego w Krakowie. Aktualnie
										pracuję w Krakowie i w Warszawie.
									</p>
									<p>
										Na co dzień zajmuję się rehabilitacją najmłodszych pacjentów oraz wspieraniem
										ich rodziców.
									</p>
									<p>
										Swoją wiedzą i doświadczeniem dzielę się na blogu, w kursach online, e-bookach
										oraz na webinarach. Sprawiam, że fizjoterapia jest dostępna dla każdego.
									</p>
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
