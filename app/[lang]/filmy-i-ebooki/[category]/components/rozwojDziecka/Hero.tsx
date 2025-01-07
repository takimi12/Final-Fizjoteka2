import Image from "next/image";
import styles from "./Hero.module.scss";
import Breadcrumbs from "../../../../../../components/breadcrumbs/breadcrumbs";
import Photo from "../../../../../../public/assets/Kurs-Noszenia/noszenie_maluszka.webp";
import Link from "next/link";

function Hero() {
	return (
		<>
			<section className={styles.Hero}>
				<div className={`Container ${styles.Container}`}>
					<Breadcrumbs />
					<div className={styles.bottomSection}>
						<div className={styles.Inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
									<h2>Rozwój dziecka w pierwszym roku życia</h2>

									<p className={styles.paragraph}>
										E-book • Wideo z ćwiczeniami • Spotkanie online
									</p>
									<p>
										Pigułka wiedzy medycznej i doświadczenia pracy z małymi pacjentami. Stań się
										świadomym i spokojnym rodzicem bez wychodzenia z domu. Zadbaj o dziecko już
										dziś.
									</p>
								</div>
								<div className={styles.buttonContainer}>
									<div className={styles.button}>
										<Link href="#info">
											<button className={styles.secondaryButton}>Czytaj więcej</button>
										</Link>
									</div>

									<div className={`${styles.button}`}>
										<Link href="#products">
											<button className={styles.primaryButton}>Zobacz ofertę</button>
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
