import styles from "./Fourth.module.scss";

async function Four() {
	return (
		<>
			<section className={`${styles.Four} flex justify-center`}>
				<div className={`Container `}>
					<div className={` ${styles.mainWrapper}`}>
						<h2 className={` ${styles.mainHeading}`}>Co mnie wyróżnia?</h2>
						<ol>
							<li>
								1.Nie znajdziesz tu pakietu 10 wizyt. Moim celem nie jest prowadzenie Twojego
								dziecka przez wiele miesięcy. Celem moich terapii jest uwolnienie przeszkody, która
								blokuje dalszy rozwój (np. rozluźnienie napięć w ciele) tak, by umożliwić dziecku
								naturalny rozwój.
							</li>
							<li>
								2.Nie stosuję metod, które sprawiają ból, a na wizytach dbam o to, by dziecko nie
								płakało.
							</li>
							<li>
								3.Tłumaczę trudne sformułowania medyczne, tak by rodzice zrozumieli problem u
								dziecka i aktywnie uczestniczyli w terapii.
							</li>
							<li>
								4.Zadaję ćwiczenia domowe. To rodzice spędzają najwięcej czasu z dzieckiem i jeśli
								nie zadbamy o podstawy takie jak: codzienna pielęgnacja, prawidłowe noszenie, czy
								leżenie na brzuszku, nawet najlepszy fizjoteraputa będzie potrzebował wielu wizyt,
								by pomóc dziecku.
							</li>
							<li>
								5.Zaproponuję zabawy dopasowane do wieku i możliwości twojego dziecka tak, by
								wspierać jego rozwój oraz pomagać w budowaniu więzi między Wami.
							</li>
							<li>
								6.Na moich wizytach możesz nagrywać ćwiczenia. Co więcej - nauczę Cię jak
								bezpiecznie ćwiczyć z dzieckiem tak, bym była pewna, że wykonasz je poprawnie.
							</li>
							<li>
								7.Dzięki konsultacjom online oszczędzam Twój czas, a dziecko nie stresuje się
								wyjściem do nowego miejsca.
							</li>
						</ol>
					</div>
				</div>
			</section>
		</>
	);
}

export default Four;
