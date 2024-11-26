import React from "react";
import lightBulb from "../../../../../../../public/assets/Kurs-Noszenia/Ten/lightBulb.svg";
import Image from "next/image";
import styles from "./Ten.module.scss";
import Buble1 from "../../../../../../../public/assets/Kurs-Noszenia/Ten/Buble1.svg";
import Buble2 from "../../../../../../../public/assets/Kurs-Noszenia/Ten/Buble2.svg";
import Buble3 from "../../../../../../../public/assets/Kurs-Noszenia/Ten/Buble3.svg";

const data = [
	{
		question: "Czy każde dziecko wymaga wizyty u fizjoterapeuty?",
		answer:
			"Nie każdy maluszek wymaga wizyty u fizjoterapeuty. Jeżeli wiesz, jak prawidłowo nosić dziecko i na co zwracać uwagę w jego rozwoju, wybierz się na konsultację wtedy, gdy coś cię zaniepokoi. W kursie tłumaczę, jakie są niepokojące symptomy w rozwoju dziecka.",
	},
	{
		question: "Czy każde dziecko trzeba nosić w fasolce?",
		answer:
			"Fasolka to pierwsza podstawowa pozycja dla noworodka i dziecka w pierwszych trzech miesiącach życia. Gdy maluszek zaczyna trzymać główkę, wtedy możemy wprowadzić kolejne pozycje, dzięki czemu dziecko będzie mogło się rozglądać.",
	},
	{
		question: "Dlaczego dziecko się pręży? Jak nosić dziecko, które wyrywa się z rąk?",
		answer:
			"Prężenie się to sygnał dla rodzica, że coś z maluszkiem nie jest w porządku. Być może dziecko ma bóle brzuszka, a może jest głodne. Jeśli dziecko pręży się przez większość czasu, zmień sposób noszenia, jeśli to nie pomaga należy skonsultować to z fizjoterapeutą.",
	},
];

const Nine = () => {
	return (
		<>
			<section className={` flex justify-center ${styles.asked}`}>
				<div className={` bubleWraper absolute left-0`}>
					<div className={` bubleWraper relative z-0`}>
					<Image
						className={`${styles.buble1} relative`}
						src={Buble1}
						alt="Buble1"
						width={125}
						height={125}
					/>
					</div>
					<div className={` bubleWraper relative z-0`}>
					<Image
						className={`${styles.buble2} relative`}
						src={Buble2}
						alt="Buble2"
						width={125}
						height={125}
					/>
					</div>
					<div className={` bubleWraper relative z-0`}>
					<Image
						className={`${styles.buble3} relative`}
						src={Buble3}
						alt="Buble3"
						width={125}
						height={125}
					/>
					</div>
				</div>
				<div className={` Container`}>
					<h2 className={` text-center mb-4`}>Znajdziesz odpowiedzi na najczęstsze pytania rodziców</h2>
					<div className={` ${styles.wraper}`}>
						{data.map((item, index) => (
							<div className={` ${styles.single}`} key={index}>
								<div className={` ${styles.cardItem}`}>
									<div className={``}>
										<Image width={30} height={30} src={lightBulb} alt="Light Bulb Icon" />
									</div>
									<h4>{item.question}</h4>
								</div>
								<div className={` ${styles.cardItem}`}>
									<p>{item.answer}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Nine;
