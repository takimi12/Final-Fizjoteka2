import Image from "next/image";
import Photo from "../../../../public/assets/Kurs-Noszenia/six.webp";
import styles from "./Six.module.scss";
import Link from "next/link";

async function Six() {
	return (
		<>
			<section className={`${styles.six} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.topSection} flex flex-col items-center`}>
						<h2>Nauczysz się, jak prawidłowo podnosić dziecko.</h2>
					</div>
					<div className={`${styles.bottomSection} flex  items-center`}>
						<div className={`${styles.inner} flex items-center`}>
							<div className={`${styles.leftSection} flex w-full flex-col justify-center gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
					
									<p>
									Prawidłowy sposób podnoszenia to taki, w którym maluszek wykaże aktywność, dzięki czemu część pracy wykona za nas.
									</p>
									<p>
										Podnoszenie noworodka różni się od podnoszenia dziecka, które kontroluje już
										główkę.
									</p>
									<p>
										W kursie pokazuję, jak podnieść nowo narodzone dziecko oraz to nieco starsze.{" "}
									</p>
								</div>
							</div>
						</div>
						<div className={`${styles.rightSection} w-full`}>
							<div className={`${styles.image} flex justify-center`}>
								<Image src={Photo} alt="moj pierwszy ebook" width={297} height={247} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Six;
