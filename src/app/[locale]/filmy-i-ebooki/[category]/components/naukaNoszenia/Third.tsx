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
						<h2 className={` text-center`}>Chcę, żeby każdy rodzic wiedział, jak prawidłowo nosić i podnosić swoje dziecko</h2>
					</div>
					<div className={`${styles.bottomSection} flex  items-center mt-10`}>
						<div className={`${styles.Inner} flex items-center`}>
							<div className={`${styles.leftSection} flex w-full flex-col justify-center gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
									<h6>Podnoszenie i odkładanie noworodka</h6>

									<ul>
										<li>
											<p>Kiedy noszenie dziecka przodem do świata jest wskazane?</p>
										</li>
										<li>
											<p>Jak nosić, jeśli dziecko nie lubi fasolki?</p>
										</li>
										<li>
											<p>Jak podnieść dziecko do odbicia?</p>
										</li>
										<li>
											<p>Jak podnieść dziecko z łóżeczka?</p>
										</li>
										<li>
											<p>Jak obracać noworodka?</p>
										</li>
									</ul>

									<p>
										To najczęstsze pytania, jakie dostaję na konsultacjach. W kursie pokażę Ci, jak
										nosić dziecko, by było to dla niego bezpiecznie.
									</p>
								</div>
							</div>
						</div>
						<div className={`${styles.rightSection} w-full flex justify-content`}>
								<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />

						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Third;
