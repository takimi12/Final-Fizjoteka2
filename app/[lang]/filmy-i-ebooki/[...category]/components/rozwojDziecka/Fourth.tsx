import Image from "next/image";
import Photo from "../../../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Fourth.module.scss";

async function Fourth() {
	return (
		<>
			<section className={styles.Ebook}>
				<div className={`${styles.Container} Container`}>
					<div className={styles.topSection}>
						<h2>Jak konkretnie mogę Ci pomóc?</h2>
						<h3>Przygotowałam zestaw materiałów na temat rozwoju dziecka w 1. roku życia.</h3>
					</div>
					<div className={styles.bottomSection}>
						<div className={styles.inner}>
							<div className={styles.leftSection}>
								<div className={styles.image}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={styles.rightSection}>
								<div className={styles.text}>
									<div>
										<h6 className={styles.title}>E-book</h6>
										<ul>
											<li>Ponad 280 stron praktycznych porad</li>
											<li>Jak rozpoznać czy dziecko rozwija się prawidłowo?</li>
											<li>Tłumaczę, dlaczego dziecko rozwija się wolniej niż inne.</li>
											<li>
												Wyjaśniam najczęstsze schorzenia u niemowląt: asymetria, wzmożone i obniżone
												napięcie mięśniowe, dysplazja stawów biodrowych.
											</li>
											<li>Nauka prawidłowego noszenia i podnoszenia.</li>
											<li>Jak układać dziecko do snu?</li>
											<li>Co zrobić, gdy dziecko ma kolkę?</li>
											<li>Jak nosić, gdy niemowlę ulewa?</li>
											<li>Co robić, by główka nie była spłaszczona?</li>
										</ul>
										<p>
											Jak wygląda e-book i spis treści? Sprawdź{" "}
											<a href="https://www.instagram.com/reel/Cw4cITFsMGJ/?igshid=MzRlODBiNWFlZA==">
												tutaj.
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Fourth;
