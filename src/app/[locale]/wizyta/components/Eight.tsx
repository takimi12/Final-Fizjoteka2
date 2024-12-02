import Link from "next/link";
import styles from "./Eight.module.scss";

async function Eight() {

	return (
		<>
			<section className={` flex justify-center ${ styles.eight }`}>
				<div className="Container">
					<div>
						<h2 className={styles.mainHeading}>
							Czym różni się konsultacja online od wizyty stacjonarnej?
						</h2>
						<ol>
							<li className={styles.list}>
								1.Podczas konsultacji nie mam możliwości zbadania i dotknięcia dziecka. Dlatego,
								żeby ocenić napięcie mięśniowe, symetrię ciała, czy rozwój dziecka najpierw uczę
								rodzica, jak wykonać dany test i na tej podstawie stawiamy diagnozę i ustalamy
								ćwiczenia.
							</li>
							<li className={styles.list}>
								2.Stawiam na edukację i dogłębne wytłumaczenie problemu. Dlatego po moich
								konsultacjach stajesz się ekspertem od swojego dziecka. Po konsultacji wiesz jak
								ćwiczyć z dzieckiem oraz jak ocenić postępy fizjoterapii.
							</li>
							<li className={styles.list}>
								3.Konsultacja online znacznie skraca czas oczekiwania na wizytę u specjalisty. W
								pilnym przypadku możesz się do mnie zgłosić po wcześniejszy termin.
							</li>
							<li className={styles.list}>
								4.Nie zostajesz bez opieki. Po konsultacji jesteśmy w kontakcie i w razie problemów
								z ćwiczeniami, służę pomocą.
							</li>
							<li className={styles.list}>
								5.Konsultacja online może być tak samo skuteczna jak wizyta stacjonarna. Wszystko
								zależy od tego jak pewnie rodzic czuje się ćwicząc ze swoim dzieckiem. Ponadto
								niektóre dzieci często płaczą i niechętnie ćwiczą w gabinecie. Wtedy ćwiczenia
								domowe z rodzicem mogą być jedyną opcją.
							</li>
							<li className={styles.list}>
								6.Konsultacja online może być też dobrym wsparciem dla dziecka, które jest już
								objęte rehabilitacją stacjonarną, ale nie otrzymujesz zaleceń domowych. W takim
								przypadku dobieram ćwiczenia tak, by wzmacniały efekt prowadzonej terapii.
							</li>
							<li className={styles.list}>
								7.Podczas konsultacji online pomagam maluszkom, które nie mają dostępu do
								rehabilitacji, bo mieszkają za granicą lub w miejscu, gdzie brakuje specjalistów
								fizjoterapii niemowlęcej.
							</li>
						</ol>
						<div className={styles.span}>
							<b className=" ">
								Sprawdź, czy konsultacja online jest dla Ciebie. Najczęstsze pytania przeczytasz{" "}
								<Link
									className={styles.link}
									target="_blank"
									rel="noopener noreferrer"
									href="https://docs.google.com/document/d/1P9Iu4Wrn1o65wqPszzBi_q-X4GAZIWR-XfR0VdGBavE"
								>
									tutaj
								</Link>
								
							</b>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Eight;
