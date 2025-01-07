import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Third.module.scss";

async function Third() {
	return (
		<>
			<section className={styles.Ebook}>
				<div className={`Container ${styles.Container}`}>
					<div className={styles.bottomSection}>
						<div className={styles.inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
									<div>
										<h2 className={styles.thirdTitle}>Metody, które stosuję</h2>
									</div>
									<div>
										<ul className={styles.ul}>
											<li className={styles.list}>
												<p>FITS – Funkcjonalna Indywidualna Terapia Skolioz,</p>
											</li>
											<li className={styles.list}>
												<p>Osteopatia w pediatrii i neonatologii,</p>
											</li>
											<li className={styles.list}>
												<p>Trójpłaszczyznowa terapia wad stóp u dzieci,</p>
											</li>
											<li className={styles.list}>
												<p>Terapia manualna dzieci i niemowląt,</p>
											</li>
											<li className={styles.list}>
												<p>PNF,</p>
											</li>
											<li className={styles.list}>
												<p>Powięź w ujęciu osteopatycznym,</p>
											</li>
											<li className={styles.list}>
												<p>Kinesiotaping,</p>
											</li>
											<li className={styles.list}>
												<p>Masaż tkanek głębokich,</p>
											</li>
											<li className={styles.list}>
												<p>Mięśniowo - powięziowe uwalnianie punktów spustowych,</p>
											</li>
											<li className={styles.list}>
												<p>Osteopatyczne podejście w leczeniu migren i bólów głowy</p>
											</li>
										</ul>
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
				</div>
			</section>
		</>
	);
}

export default Third;
