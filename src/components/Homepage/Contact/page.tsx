import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Hero/helloSection_magda.webp";
import styles from "./Contact.module.scss";
import Arrow from "../../../../public/assets/HomePage/Help/arrow.jsx";
import Link from "next/link";
import facebook from "../../../../public/assets/HomePage/Contact/facebook.svg";
import instagram from "../../../../public/assets/HomePage/Contact/instagram.svg";
import youtube from "../../../../public/assets/HomePage/Contact/youtube.svg";
import arrow from "../../../../public/assets/HomePage/Contact/arrow.svg";
import Button from "../../repeated/button/page";

async function Contact() {
	const data = [
		{
			image: facebook,
			title: "Facebook",
			paragraph:
				"Stworzyłam wspierającą grupę na Faceebooku. Łączy ona już ponad 8 tys. rodziców i fizjoterapeutów. Możesz zadawać pytaniai pomagać innym mamom.",
			link: "Dołącz",
			imageline: arrow,
		},
		{
			image: youtube,
			title: "Youtube",
			paragraph:
				"Na kanał trafiają filmy edukacyjne ze wskazówkami dotyczącymi pielęgnacji i wspierania prawidłowego rozwoju dzieci i niemowląt",
			link: "Dołącz",
			imageline: arrow,
		},
		{
			image: instagram,
			title: "Instagram",
			paragraph:
				"Na Instagramie poza merytorycznymi postami dzielę się lżejszymi tematami i kulisami pracy fizjoterapeuty. ",
			link: "Dołącz",
			imageline: arrow,
		},
	];

	return (
		<>
			<section className={`${styles.Help}`}>
				<div className={`Container`}>
					<div className={`${styles.topSection}`}>
						<h2 className={` ${styles.title}`}>Bądźmy w kontakcie!</h2>
						<h3 className={` ${styles.subtitle}`}>Dołącz do moich kanałów i bądź na bieżąco z poradami fizjoterapeuty.</h3>
					</div>
					<div className={` ${styles.itemWraper}`}>
						{data.map((item, index) => (
							<div key={index} className={` ${styles.bottomItem}`}>
								<div className={`iconBox`}>
									<Image width={25} height={25} src={item.image} alt="photo" />
								</div>
								<h3 className={`text-center my-6 `}>{item.title}</h3>
								<p className={`${styles.paragraph}`}>{item.paragraph}</p>
								<Button link="" link1={item.link} />
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default Contact;
