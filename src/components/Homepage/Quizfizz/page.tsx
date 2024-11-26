import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Quizfizz.module.scss";
import Link from "next/link";

async function Quizfizz() {
	return (
		<>
			<section className={`${styles.Quiz} `}>
				<div className={`Container m-auto`}>
					<div className={`${styles.topSection}  `}>
						<h2>FizQuiz Asymetria</h2>
					</div>
					<div className={`${styles.bottomSection} `}>
						<div className={`${styles.inner}`}>
							<div className={`${styles.leftSection}  gap-3`}>
								<div className={`${styles.text}  gap-5`}>
									<p>
										Asymetria ułożeniowa to jedno z najczęstszych schorzeń u niemowląt. Rodzice
										często jednak nie wiedzą dużo na jej temat.
									</p>
									<p>
										Jeśli Ty masz wątpliwości, czy Twoje dziecko może mieć asymetrię sprawdź
										koniecznie mój FizQuiz.
									</p>
								</div>
								<div className={`${styles.button}`}>
									<Link href="/fizzquiz">
										<button className={``}>Przejdź quiz</button>
									</Link>
								</div>
							</div>
						</div>
						<div className={`${styles.rightSection} `}>
							<div className={`${styles.image} `}>
								<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Quizfizz;
