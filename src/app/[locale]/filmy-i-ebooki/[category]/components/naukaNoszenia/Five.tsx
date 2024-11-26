import Image from "next/image";
import Photo from "../../../../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Five.module.scss";
import Link from "next/link";

async function Five() {
	return (
		<>
			<section className={`${styles.Ebook} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.topSection} flex flex-col items-center`}>
						<h2>Czy też popełniasz ten błąd?</h2>

					</div>
					<div className={`${styles.bottomSection} flex  items-center mt-20`}>
						<div className={` ${styles.inner} flex items-center gap-10`}>
							<div className={`${styles.leftSection} w-full`}>
								<div className={`${styles.image} flex justify-center`}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={`${styles.rightSection} flex w-full flex-col justify-center gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
									<p>
									Najczęściej rodzice podnoszą dziecko pod głową i pod pupą. 

									</p>
									<p>
									Mimo, że to najprostszy i najszybszy sposób podnoszenia, nie jest zdrowy ani dla dziecka, ani dla rodzica. 

									</p>
									<p>
									Maluszek podnoszony w ten sposób gwałtownie traci płaszczyznę podparcia, przez co napina się i pręży, a czasem odruchowo odrzuca rączki w tył. Takim podnoszeniem niepotrzebnie stymulujesz odruch Moro.
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
