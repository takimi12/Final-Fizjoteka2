import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Five.module.scss";

async function Five() {
	return (
		<>
			<section className={styles.Ebook}>
				<div className={` Container ${styles.Container}`}>
					<div className={styles.bottomSection}>
						<div className={styles.Inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
									<div className={styles.title}>
										<h2>Działalność online</h2>
									</div>
									<div>
										<p>
											Zaczęło się trzy lata temu od bloga, później doszły kanały w social mediach.
											Obecnie regularnie prowadzę również webinary i nagrywam wideo.
										</p>
										<p>Porady na moim blogu szuka każdego miesiąca ponad 50 tysięcy rodziców!</p>
										<p>
											Dzięki działalności online miałam okazję współpracować z: M jak mama •
											Świadoma Mama • Kobiecy Białystok • Znajdź fizjoterapeutę • Krajowa Izba
											Fizjoterapii • Radio Wnet i ZET
										</p>
									</div>
									<div></div>
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

export default Five;
