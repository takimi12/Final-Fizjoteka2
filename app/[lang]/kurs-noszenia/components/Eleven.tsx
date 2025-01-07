import React from "react";
import styles from "./Eleven.module.scss";
import Link from "next/link";
import circle from "../../../../public/assets/Kurs-Noszenia/Eleven/circle.svg";

import title from "../../../../public/assets/Kurs-Noszenia/Eleven/c654c040-e957-4315-8f89-07b7021ad1c7-2.webp";
import Image from "next/image";

const productsData = [
	{
		mainfoto: title,
		date: "14.12.2023",
		name: "Noworodek",
		link: "https://efizjoteka.com/kurs-noszenia/82734c45-0de7-47c9-a4c4-cc09bae5c53f",
		subtitle: "pielęgnacja i noszenie 0-2 miesięcy",
		description: [
			"Ponad 2 godziny nagrań!",
			"To pakiet dla rodziców, którzy spodziewają się dziecka, bądź maleństwo właśnie przyszło na świat",
			"Poznasz właściwe ponoszenie i noszenie noworodka",
			"Nauczysz się pozycji do odbicia",
			"Przygotujesz się do prawidłowej pielęgnacji dziecka, czyli przewijania, ubierania, karmienia, podawania z rąk do rąk maleństwa",
			"Nauczysz się, jak bezpiecznie kąpać dziecko",
			"Pokażę Ci, jak pomóc dziecku z kolką",
		],
		available: "Produkt dostępny",
		online: circle,
		price: "177.00 zł",
	},
	{
		mainfoto: title,
		date: "14.12.2023",
		name: "Niemowlę",
		link: "https://efizjoteka.com/kurs-noszenia/68589d6d-bebe-4339-8309-3da93d0c9a51",
		subtitle: "pielęgnacja i noszenie 3-6 miesięcy",
		description: [
			"To pakiet dla rodziców znających już podstawy pielęgnacji niemowląt",
			"Poznasz nowe sposoby na noszenie dziecka",
			"Dowiesz się, jak podnosić dziecko, które trzyma główkę",
			"Nauczysz się pozycji do odbicia",
			"Pomogę Ci wybrać matę dla niemowlaka",
			"Poznasz zabawy na macie",
			"Nauczysz się zabaw wspierających rozwój dziecka",
			"Pokażę Ci zabawy na piłce",
		],
		available: "Produkt dostępny",
		online: circle,
		price: "147.00 zł",
	},
	{
		mainfoto: title,
		date: "14.12.2023",
		name: "Noworodek + niemowlę",
		link: "https://efizjoteka.com/kurs-noszenia/08825c2f-e6e4-483c-878f-3566b13af915",
		subtitle: "pielęgnacja i noszenie 0-6 miesięcy",
		description: [
			"To pakiet 3 godzin nagrań o pielęgnacji",
			"Kupując ten pakiet otrzymujesz całość o 20% taniej",
			"To pakiet dla rodziców, którzy chcą zadbać o prawidłowy rozwój dziecka w pierwszym półroczu życia",
			"Dowiesz się, czym różni się noszenie noworodka od dzieci starszych, które już trzymają główkę",
			"Poznasz wspierające zabawy",
			"Nauczysz się pielęgnacji adekwatnej do wieku, czyli sposobów noszenia, podnoszenia, przewijania, kąpania, pozycji do odbicia oraz karmienia",
			"Przygotujesz się do opieki nad dzieckiem od urodzenia aż po 6 miesiąc życia",
		],
		available: "Produkt dostępny",
		online: circle,
		price: "257.00 zł",
	},
];

const Eleven = () => {
	return (
		<section className={styles.Eleven} id="products">
			<div className={`Container ${styles.Container}`}>
				<div className={styles.top}>
					<h4>Znajdź produkt odpowiedni dla Ciebie</h4>
					<p>
						Uzyskując nieograniczony dostęp do filmów, masz szansę nadrobić webinary w wygodnym dla
						siebie momencie.
					</p>
				</div>
				<div className={styles.blockParent}>
					{productsData.map((product, index) => (
						<div key={index} className={styles.singleBox}>
							<span className={styles.available}>{product.available}</span>
							<span className={styles.date}>{product.date}</span>
							<div className={styles.imageContainer}>
								<Image src={product.mainfoto} width={200} height={200} alt={product.name} />
							</div>
							<div className={styles.title}>
								<Link href={product.link} className={styles.anchor}>
									<h4>{product.name}</h4>
								</Link>
								<p className={styles.subtitle}>{product.subtitle}</p>
							</div>
							<div className={styles.descriptionContainer}>
								<ul className={styles.listParent}>
									{product.description.map((item, itemIndex) => (
										<li key={itemIndex} className={styles.list}>
											{item}
										</li>
									))}
								</ul>
								<div className={styles.availabilityContainer}>
									<Image src={product.online} width={15} height={15} alt="online" />
									<p className={styles.availableprize}>{product.available}</p>
								</div>
								<div className={styles.priceContainer}>
									<p className={styles.price}>{product.price}</p>
									<Link href={product.link}>
										<button>Zobacz ofertę</button>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Eleven;
