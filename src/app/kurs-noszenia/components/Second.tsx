import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Second.module.scss";
import Link from "next/link";

async function Second() {
	return (
		<>
			<section className={`${styles.second} flex justify-center`} id="info">
				<div className={`Container `}>
					<div className={`${styles.topSection} flex flex-col items-center`}>
						<h2>Cześć!</h2>
						<h3 className={` ${styles.bottomText}`}>Nazywam sie Magdalena Adas</h3>
					</div>
					<div className={`${styles.bottomSection} flex  items-center`}>
						<div className={`${styles.Inner} flex items-center gap-10`}>
							<div className={`${styles.leftSection} w-full`}>
								<div className={`${styles.image} flex justify-center`}>
									<Image src={Photo} alt="moj pierwszy ebook" width={408} height={292} />
								</div>
							</div>
							<div className={`${styles.rightSection} flex w-full flex-col justify-center gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
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
