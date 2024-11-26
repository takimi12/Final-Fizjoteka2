import Image from "next/image";
import Photo from "../../../../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Third.module.scss";
import Link from "next/link";

async function Third() {
	return (
		<>
			<section className={`${styles.Ebook} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.topSection} flex flex-col items-center`}>
						<h2 className={` text-center`}>Chcę, żeby każdy rodzic miał dostęp do rzetelnej wiedzy na temat rozwoju dziecka</h2>
					</div>
					<div className={`${styles.bottomSection} flex  items-center mt-10`}>
						<div className={`${styles.Inner} flex items-center`}>
							<div className={`${styles.leftSection} flex w-full flex-col justify-center gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
									<h6 className={styles.question}>Czy moje dziecko rozwija się prawidłowo?</h6>

							
									<p>
									To jedno z najczęściej zadawanych pytań, jakie od Was dostaję.
									</p>
									<p>
									Nie jestem w stanie pomóc wszystkim osobiście. Gwarantuję jednak, że przygotowane przeze mnie materiały są prawdziwą pigułką wiedzy.
									</p>
								</div>
							</div>
						</div>
						<div className={`${styles.rightSection} w-full flex justify-end `}>
								<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />

						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Third;
