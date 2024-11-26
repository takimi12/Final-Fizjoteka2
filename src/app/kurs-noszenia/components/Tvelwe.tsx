import React from "react";
import styles from "./Tvelve.module.scss";

const data = [
	{
		title: "Noszenie i podnoszenie noworodka",
		subtitle: "Dowiesz się",
		content: [
			"jak podnieść dziecko bokiem,",
			"jak podnieść dziecko z przewijaka,",
			"jak podawać dziecko z rąk do rąk,",
			"w jakich pozycjach nosić noworodka.",
		],
	},
	{
		title: "Pielęgnacja noworodka i starszych niemowląt",
		subtitle: "Nauczysz się",
		content: [
			"jak przewinąć dziecko,",
			"jak pielęgnować noworodka,",
			"jak obracać dziecko na boczki podczas przewijania,",
			"jak ubrać maluszka,",
			"jak podnieść z maty.",
		],
	},
	{
		title: "Najczęstsze problemy rodziców",
		subtitle: "Z tej części dowiesz się",
		content: [
			"jak włożyć i wyciągnąć dziecko z fotelika samochodowego,",
			"podnoszenie i odkładanie maluszka do gondoli,",
			"ile dziecko powinno leżeć na brzuszku,",
			"jak kangurować dziecko.",
		],
	},
	{
		title: "Najczęstsze schorzenia u niemowląt",
		subtitle: "Nauczysz się",
		content: [
			"jak zapobiegać asymetrii u dziecka,",
			"jak nosić dziecko, gdy się pręży,",
			"jak rozpoznać obniżone i wzmożone napięcie mięśniowe u dziecka,",
			"jak dbać o bioderka.",
		],
	},
	{
		title: "Codzienne rutyny w opiece nad maluszkiem",
		subtitle: "Dowiesz się ",
		content: [
			"w jakich pozycjach układać dziecko,",
			"od kiedy układać dziecko na brzuszku,",
			"ile dziecko powinno leżeć na brzuszku,",
			"jak wybrać matę dla dziecka.",
		],
	},
	{
		title: "Karmienie i pozycje do odbicia",
		subtitle: "W tej części tłumaczę",
		content: [
			"w jakich pozycjach karmić dziecko piersią i butelką,",
			"jak przełożyć dziecko podczas karmienia,",
			"jak podnieść dziecko do odbicia,",
			"pozycje do odbicia na udach rodzica",
		],
	},
	{
		title: "Sen, rutyny wieczorne i kąpiel dziecka",
		subtitle: "Dowiesz się",
		content: [
			"jak odkładać dziecko do łóżeczka i dostawki,",
			"w jakiej pozycji powinno spać dziecko,",
			"czy można układać niemowlę do snu na brzuszku,",
			"jak kąpać dziecko.",
		],
	},
	{
		title: "Zabawy wspierające rozwój dziecka",
		subtitle: "W tej części poznasz ",
		content: [
			"bezpieczne zabawki,",
			"zabawy stymulujące rozwój dziecka,",
			"zabawy na piłce gimnastycznej,",
			"zabawy na macie,",
			"zabawy pomagające w nauce obrotów.",
		],
	},
	{
		title: "Kolki u niemowląt - jak sobie z nimi poradzić?",
		subtitle: "Dowiesz się",
		content: [
			"jak pomóc dziecku, które ma kolkę,",
			"w jakich pozycjach nosić maluszka, który ma bóle brzuszka,",
			"jak i kiedy masować dziecko, które ma problemy z kolkami.",
		],
	},
];

const Tvelwe = () => {
	return (
		<section className={` flex justify-center ${styles.tvelve}`}>
			<div className={` Container`}>
				<div className={` flex flex-col  justify-center text-center `}>
					<h2 className={``}>Co znajdziesz w kursie</h2>
					<h6 className={` mb-5 mt-5 ${styles.subtitle}`}>
						Kurs przygotowałam na podstawie najczęstszych pytań, jakie dostaję podczas konsultacji.
						Aby uzyskać odpowiedzi na nie wszystkie, potrzebowalibyśmy minimum 5 wizyt! A w tym
						kursie otrzymujesz to w cenie jednej wizyty z fizjoterapeutą.
					</h6>
				</div>
				<div className={` ${styles.wraper}`}>
					{data.map((item, index) => (
						<div key={index} className={` ${styles.card}`}>
							<h5 className={` mb-4`}>{item.title}</h5>
							<span className={` ${styles.subtitle}`}>{item.subtitle}</span>
								<ul className={` ${styles.ul}`}>
									{item.content.map((point, idx) => (
										<li className={` ${styles.point}`} key={idx}>
											<span className={` ${styles.pointer}`}>{point}</span>
										</li>
									))}
								</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Tvelwe;
