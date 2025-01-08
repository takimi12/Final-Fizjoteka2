import React from "react";
import styles from "./Eight.module.scss";

const data = [
	{
		title: "Co znajdziesz w poradniku?",
		items: [
			"Miesiąc po miesiącu tłumaczę, jak rozwija się dziecko w 1. roku życia.",
			"Pokażę Ci, co powinno Cię zaniepokoić w rozwoju.",
		],
	},
	{
		title: "Kamienie milowe - jak i kiedy dziecko je osiąga.",
		items: [
			"Od kiedy trzyma główkę?",
			"Kiedy dziecko się obraca?",
			"Czy musi czworakować?",
			"Kiedy usiądzie?",
			"Kiedy zacznie siadać?",
		],
	},
	{
		title: "Jak i kiedy układać dziecko na brzuszku?",
		items: [
			"Czy wiesz, że dziecko układamy na brzuszku już od urodzenia?",
			"Pokażę Ci, jak układać dziecko, by pokochało tę pozycję.",
		],
	},
	{
		title: "Tłumaczę najczęściej występujące schorzenia",
		items: [
			"Czym jest asymetria ułożeniowa?",
			"Jak rozpoznać, czy dziecko ma wzmożone lub obniżone napięcie mięśniowe?",
			"Czym jest dysplazja stawów biodrowych?",
		],
	},
	{
		title: "Jak układać dziecko do snu?",
		items: [
			"Jakie znaczenie ma łóżeczko, materac i poduszka dla prawidłowego rozwoju dziecka?",
			"W jakiej pozycji najlepiej układać dziecko do snu?",
		],
	},
	{
		title: "Co znajdziesz w wersji z filmem?",
		items: [
			"W filmie pokazuję, wszystkie techniki wykonywane co dzień podczas pielęgnacji dziecka.",
			"Uczę jak podnosić i nosić dziecko adekwatnie do jego wieku.",
		],
	},
];

const Eight = () => {
	return (
		<section className={styles.tvelve}>
			<div className={`Container ${styles.container}`}>
				<div className={styles.header}>
					<h2>Wahasz się czy poradnik jest dla Ciebie?</h2>
					<h6 className={styles.subtitle}>Sprawdź jakie tematy w nim poruszam.</h6>
				</div>
				<div className={styles.wraper}>
					{data.map((item, index) => (
						<div key={index} className={styles.card}>
							<h5>{item.title}</h5>
							<ul className={styles.ul}>
								{item.items.map((subItem, subIndex) => (
									<li key={subIndex} className={styles.point}>
										{subItem}
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

export default Eight;
