import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Five.module.scss";

async function Five() {
	return (
		<>
			<section className={styles.Ebook}>
				<div className={`${styles.container} Container`}>
					<div className={styles.topSection}>
						<h2>Czy też popełniasz ten błąd?</h2>
					</div>
					<div className={styles.bottomSection}>
						<div className={styles.inner}>
							<div className={styles.leftSection}>
								<div className={styles.image}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={styles.rightSection}>
								<div className={styles.text}>
									<p>Najczęściej rodzice podnoszą dziecko pod głową i pod pupą.</p>
									<p>
										Mimo, że to najprostszy i najszybszy sposób podnoszenia, nie jest zdrowy ani dla
										dziecka, ani dla rodzica.
									</p>
									<p>
										Maluszek podnoszony w ten sposób gwałtownie traci płaszczyznę podparcia, przez
										co napina się i pręży, a czasem odruchowo odrzuca rączki w tył. Takim
										podnoszeniem niepotrzebnie stymulujesz odruch Moro.
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

export default Five;
