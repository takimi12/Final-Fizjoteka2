import Image from "next/image";
import styles from "./Hero.module.scss";
import Breadcrumbs from "../../../../components/breadcrumbs/breadcrumbs";
import Photo from "../../../../public/assets/Kurs-Noszenia/noszenie_maluszka.webp";
import Link from "next/link";

function Hero() {
	return (
		<>
			<section className={`${styles.Hero} Container`}>
				<Breadcrumbs />

				<div className={styles.Container}>
					<div className={styles.bottomSection}>
						<div className={styles.Inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
									<h2>Noszenie i pielęgnacja maluszka</h2>
									<p className={styles.paragraph}>
										Kurs dla rodzica • Nagrania wideo • Spotkanie online
									</p>
									<p>
										Pigułka wiedzy medycznej i doświadczenia pracy z małymi pacjentami. Nauczysz
										się, jak dbać o twoje maleństwo bez stresu i wychodzenia z domu.
									</p>
								</div>
								<div className={styles.buttons}>
									<div className={styles.button}>
										<Link href="#info">
											<button className={styles.secondaryButton}>Czytaj więcej</button>
										</Link>
									</div>

									<div className={styles.button}>
										<Link href="#products">
											<button className={styles.Button_button}>Zobacz ofertę</button>
										</Link>
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

export default Hero;
