import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Hero/helloSection_magda.webp";
import styles from "./Hero.module.scss";

function Hero() {
	return (
		<>
			<section className={` ${styles.Hero}`}>
				<div className={`Container`}>
					<div className={` ${styles.Inner}`}>
						<div className={` ${styles.leftSection}`}>
							<div className={` ${styles.title}`}>
								<h1>Umów wizytę teraz w domu lub online</h1>
							</div>
							<p className={`${styles.paragraph}`}>
								Jestem fizjoterapeutką dziecięcą i edukatorką.
							</p>
							<p className={`font-bold ${styles.paragraph}`}>
								Jestem specjalistką fizjoterapii niemowlęcej. Pomagam w formie konsultacji online i
								docieram tam, gdzie nie ma dostępu do fizjoterapeuty.
							</p>
							<p className={`font-bold ${styles.paragraph}`}>
								Pomagam rodzicom odzyskać spokój i pewność w opiece nad dzieckiem.
							</p>
						</div>
						<div className={`${styles.rightSection}`}>
							<Image
								src={Photo}
								width={408}
								height={404}
								alt="Zdjęcie Magdy, autorki bloga"
								aria-label="Zdjęcie Magdy, autorki bloga"
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Hero;
