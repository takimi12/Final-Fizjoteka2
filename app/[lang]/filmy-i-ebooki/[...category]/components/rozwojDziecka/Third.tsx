import Image from "next/image";
import Photo from "../../../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Third.module.scss";

async function Third() {
	return (
		<>
			<section className={styles.Ebook}>
				<div className={`${styles.Container} Container`}>
					<div className={styles.topSection}>
						<h2 className={styles.textCenter}>
							Chcę, żeby każdy rodzic miał dostęp do rzetelnej wiedzy na temat rozwoju dziecka
						</h2>
					</div>
					<div className={styles.bottomSection}>
						<div className={styles.Inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
									<h6 className={styles.question}>Czy moje dziecko rozwija się prawidłowo?</h6>
									<p>To jedno z najczęściej zadawanych pytań, jakie od Was dostaję.</p>
									<p>
										Nie jestem w stanie pomóc wszystkim osobiście. Gwarantuję jednak, że
										przygotowane przeze mnie materiały są prawdziwą pigułką wiedzy.
									</p>
								</div>
							</div>
						</div>
						<div className={styles.rightSection}>
							<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Third;
