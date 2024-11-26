import Image from "next/image";
import Photo from "../../../../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Fourth.module.scss";
import Link from "next/link";

async function Seven() {
	return (
		<>
			<section className={`${styles.Ebook} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.topSection} flex flex-col items-center `}>
						<h2>Jak konkretnie mogę Ci pomóc?</h2>
						<h3>Przygotowałam zestaw materiałów na temat asymetrii.</h3>
					</div>
					<div className={`${styles.bottomSection} flex  items-center mt-20`}>
						<div className={`${styles.inner} flex w-full items-center gap-10`}>
							<div className={`${styles.leftSection} w-full`}>
								<div className={`${styles.image} flex justify-center`}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={`${styles.rightSection} flex w-full flex-col justify-center gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
								<div>
  <div>
    <h6>PORADNIK (E-BOOK) PDF</h6>
    <ul>
      <li>ponad 90 stron praktycznych porad</li>
      <li>symetria i asymetria ciała</li>
      <li>konkretne metody wspierania prawidłowego rozwoju dziecka</li>
    </ul>
    <h6>WIDEO Z ĆWICZENIAMI W FORMIE ZABAWY</h6>
    <ul>
      <li>ponad godzina filmów instruktażowych z ćwiczeniami na asymetrię dla dziecka w pierwszym roku życia</li>
      <li>prezentacja ćwiczeń opisanych w e-booku</li>
    </ul>
    <h6>SPOTKANIE ONLINE</h6>
    <ul>
      <li>indywidualna konsultacja z fizjoterapeutą</li>
      <li>możliwość skonsultowania dodatkowych objawów u dziecka</li>
      <li>indywidualny dobór ćwiczeń</li>
    </ul>
  </div>
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

export default Seven;
