import styles from "./Second.module.scss";
import Wizyta from "../../../../public/assets/Wizyta/newsletter.webp";
import Image from "next/image";
import Link from "next/link";

function Second() {
	return (
		<>
			<section className={styles.second}>
				<div className={`Container ${styles.container}`}>
					<div className={styles.content}>
						<div className={styles.textCenter}>
							<h3 className={styles.mainHeading}>Zapisz się na konsultację</h3>
							<div className={styles.inner}>
								<div className={styles.imageContainer}>
									<Image
										className={styles.image}
										src={Wizyta}
										alt="Newsletter"
										width={408}
										height={404}
									/>
								</div>
								<div className={styles.columnSection}>
									<div className={styles.buttonContainer}>
										<Link
											href="https://widget.zarezerwuj.pl/direct/b02f996b-e919-4357-8c78-99b006488d85"
											target="_blank"
											rel="noreferrer external nofollow"
											aria-label="eFizjoteka rezerwacja"
										>
											<button className={styles.button}>KONSULTACJA ONLINE</button>
										</Link>
										<button className={styles.button}>WIZYTA DOMOWA W WARSZAWIE</button>
										<Link
											href="https://widget.zarezerwuj.pl/direct/b02f996b-e919-4357-8c78-99b006488d85"
											target="_blank"
											rel="noreferrer external nofollow"
											aria-label="eFizjoteka rezerwacja"
										>
											<button className={styles.button}>WIZYTA DOMOWA W POŁAŃCU</button>
										</Link>
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

export default Second;
