import Link from "next/link";
import styles from "./Ten.module.scss";

async function Ten() {
	const consultations = [
		{
			type: "Konsultacja online",
			price: "200 zł",
			time: "Czas: 40 minut",
			reservation: "Dostępne szybkie terminy",
			place: "Rezerwacja terminu online",
			exercise: "Nauka ćwiczeń do samodzielnej pracy",
			setskillbold: "Otrzymasz zestaw ćwiczeń na 1 do 3 miesięcy",
			url: "https://widget.zarezerwuj.pl/direct/b02f996b-e919-4357-8c78-99b006488d85",
		},
		{
			type: "Wizyta domowa Warszawa",
			price: "300 zł",
			time: "Czas: 60 minut",
			reservationbold: "Zalecenia domowe",
			place: "Wizyta w domu pacjenta",
			exercise: "Brak dopłat za dojazd",
			setskill: "Kolejne wizyty ustalone wg indywidualnych potrzeb pacjenta",
			url: "https://widget.zarezerwuj.pl/direct/b02f996b-e919-4357-8c78-99b006488d85",
		},
		{
			type: "Wizyta stacjonarna Połaniec",
			price: "250 zł",
			time: "Czas: 60 minut",
			reservationbold: "Zalecenia domowe",
			place: "Wizyta w domu pacjenta lub w gabinecie",
			exercise: "Brak dopłat za dojazd",
			setskill: "W Połańcu konsultacje raz w miesiącu",
			url: "https://widget.zarezerwuj.pl/direct/b02f996b-e919-4357-8c78-99b006488d85",
		},
	];

	return (
		<>
			<section className={`${styles.ten} flex justify-center`}>
				<div className={`Container`}>
					<h2 className={` text-center mb-5`}>Cennik</h2>
					<div className={` ${styles.wraper}`}>
						{consultations.map((consultation, index) => (
							<div key={index} className={styles.consultationSingle}>
								<h3 className={`${styles.consulationHeading}`}>{consultation.type}</h3>
								<p className={` ${styles.consultationPrice}`}>{consultation.price}</p>
								<ul className={`${styles.ul}`}>
									<li className={` font-bold`}>{consultation.time}</li>{" "}
									{consultation.reservation && <li>{consultation.reservation}</li>}
									{consultation.reservationbold && (
										<li className="font-bold">{consultation.reservationbold}</li>
									)}
									<li>{consultation.place}</li>
									<li>{consultation.exercise}</li>
									{consultation.setskill && <li>{consultation.setskill}</li>}
									{consultation.setskillbold && (
										<li className="font-bold">{consultation.setskillbold}</li>
									)}
								</ul>
								<Link href={consultation.url}>
									<button className={styles.bookLink}>Zarezerwuj teraz</button>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default Ten;
