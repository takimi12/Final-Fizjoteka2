import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Five.module.scss";
import Link from "next/link";

async function Five() {
	return (
		<>
			<section className={`${styles.Ebook} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.bottomSection} flex  items-center`}>
						<div className="Inner flex items-center">
							<div className={`${styles.leftSection} flex w-full flex-col justify-center gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
									<div className="SimpleSection_title__RKgMt">
										<h2>Działalność online</h2>
									</div>
									<div>
										<p>
											Zaczęło się trzy lata temu od bloga, później doszły kanały w social mediach.
											Obecnie regularnie prowadzę również webinary i nagrywam wideo.
										</p>
										<p>Porady na moim blogu szuka każdego miesiąca ponad 50 tysięcy rodziców!</p>
										<p>
											Dzięki działalności online miałam okazję współpracować z: M jak mama •
											Świadoma Mama • Kobiecy Białystok • Znajdź fizjoterapeutę • Krajowa Izba
											Fizjoterapii • Radio Wnet i ZET
										</p>
									</div>

									<div></div>
								</div>
							</div>
						</div>
						<div className={`${styles.rightSection} w-full`}>
							<div className={`${styles.image} flex justify-center`}>
								<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Five;
