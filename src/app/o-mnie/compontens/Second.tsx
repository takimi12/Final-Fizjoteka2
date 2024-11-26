import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Ebook/ebook_product-title.webp";
import styles from "./Second.module.scss";
import Link from "next/link";

async function Second() {
	return (
		<>
			<section className={`${styles.second} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.topSection} flex flex-col items-center`}>
						<h2>Codzienna praca z pacjentami</h2>
						<h6 className={`${styles.smaller}`}>Specjalizuję się w fizjoterapii niemowląt oraz dzieci z wadami postawy</h6>
					</div>
					<div className={`${styles.bottomSection} flex  items-center`}>
						<div className={`${styles.inner} flex items-center`}>
							<div className={`${styles.leftSection} w-full`}>
								<div className={`${styles.image} flex justify-center`}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={`${styles.rightSection} flex w-full flex-col  gap-3`}>
								<div className={`font-bold`}>
									<h3 className={` ${styles.smallerTitle}`}>Kraków i Warszawa</h3>
								</div>
								<div className={`${styles.text} flex flex-col gap-3`}>
									<p>
										Jestem absolwentką Collegium Medicum w Krakowie. Pierwsze doświadczenia w pracy
										z maluszkami zdobyłam w Hospicjum domowym dla dzieci Alma Spei.
									</p>
									<p>
										Pomagam w formie wizyt domowych w Krakowie i w Warszawie oraz podczas
										konsultacji on-line. W sprawie wizyt możesz kontaktować się ze mną telefonicznie
										albo za pomocą Facebooka lub Instagrama.
									</p>
									<p>
										Rodzice nazywają mnie zaklinaczką dzieci. Pomagam nawet tym, które nieustannie
										płaczą i wymagają ciągłego noszenia na rękach.
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
