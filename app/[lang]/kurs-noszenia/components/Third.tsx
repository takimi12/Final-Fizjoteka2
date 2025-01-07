import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Third.module.scss";

async function Third() {
	return (
		<>
			<section className={styles.Ebook}>
				<div className="Container">
					<div className={styles.topSection}>
						<h2 className="">
							Chcę, żeby każdy rodzic wiedział, jak prawidłowo nosić i podnosić swoje dziecko
						</h2>
					</div>
					<div className={styles.bottomSection}>
						<div className={styles.Inner}>
							<div className={styles.leftSection}>
								<div className={styles.text}>
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
