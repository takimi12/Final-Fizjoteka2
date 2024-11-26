import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Hero/helloSection_magda.webp";
import styles from "./Hero.module.scss";

function Hero() {
	return (
		<>
			<section className={`${styles.Hero}`}>
				<div className={`Container`}>
					<div className={`${styles.Inner}`}>
						<div className={` ${styles.leftSection}`}>
							<div className={` ${styles.title}`}>
								<h1>Nazywam się Magdalena Adaś</h1>
							</div>
							<p className={`${styles.paragraph}`}>
								Jestem fizjoterapeutką dziecięcą i edukatorką.
							</p>
							<p className={`font-bold ${styles.paragraph}`}>
								Moim marzeniem jest aby każdy rodzic, niezależnie od miejsca zamieszkania i
								funduszy, miał dostęp do merytorycznej wiedzy o prawidłowej pielęgnacji dzieci.
							</p>
							<p className={`${styles.paragraph}`}>
								Na co dzień realizuję je przez pracę z pacjentami oraz działalność edukacyjną w
								świecie online.
							</p>
						</div>
						<div className={` ${styles.rightSection}`}>
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
