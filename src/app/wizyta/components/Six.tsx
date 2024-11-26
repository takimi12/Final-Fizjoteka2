import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Six.module.scss";


async function Six() {
	return (
		<>
			<section className={`${styles.Six} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.bottomSection} flex  items-center`}>
						<div className={`Inner flex items-center`}>
							<div className={`${styles.leftSection} flex w-full flex-col justify-center gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
									<h6 className={` ${styles.mainHeading}`}>Konsultacja online</h6>

									<div className={` ${styles.paragraphParent}`}> 
										<p className={` `}>
											Podczas wideorozmowy zbieram wywiad i ustalam jak pomóc dziecku oraz dobieram
											odpowiednią terapię i ćwiczenia dla rodzica.
										</p>
										<p className={`font-semibold `}>
											Nauczę Cię prawidłowego sposobu noszenia oraz pielęgnacji dziecka. 
										</p>
										<p className={` `}>
											Nie jest to typowa wizyta, gdzie fizjoterapeuta ćwiczy, a Ty się przyglądasz.
											Celem konsultacji online jest nauczyć Cię ćwiczeń tak, byś to Ty rodzicu wziął
											odpowiedzialność za swoje dziecko.
										</p>
										<p className={`font-bold `}>
											<span>
												Wystarczy nam jedna wizyta, by wybrać odpowiednie ćwiczenia dla dziecka.
												Ustalamy cele, a gdy je osiągniesz, umawiamy kolejną wizytę.
											</span>
										</p>
									</div>
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

export default Six;
