import styles from "./Second.module.scss";
import Wizyta from "../../../../public/assets/Wizyta/newsletter.webp";
import Image from "next/image";
import Link from "next/link";

function Hero() {
	return (
		<>
			<section className={`${styles.second} flex justify-center`}>
				<div className={`Container`}>
					<div className="">
						<div className={`flex flex-col items-center justify-center`}>
							<h3 className={` ${styles.mainHeading}`}>Zapisz się na konsultację</h3>
							<div className={` flex gap-10 ${styles.inner}`}>
								<div className={` w-full`}>
									<Image className={` `} src={Wizyta} alt="Newsletter" width={408} height={404} />
								</div>
								<div className={` flex w-full items-center ${styles.columnSection}`}>
									<div className={` flex flex-col items-center`}>
										<Link
											href="https://widget.zarezerwuj.pl/direct/b02f996b-e919-4357-8c78-99b006488d85"
											target="_blank"
											rel="noreferrer external nofollow"
											aria-label="eFizjoteka rezerwacja"
										>
											<button className={` ${styles.button}`}>KONSULTACJA ONLINE</button>
										</Link>
										<button className={` ${styles.button}`}>WIZYTA DOMOWA W WARSZAWIE</button>
										<Link
											href="https://widget.zarezerwuj.pl/direct/b02f996b-e919-4357-8c78-99b006488d85"
											target="_blank"
											rel="noreferrer external nofollow"
											aria-label="eFizjoteka rezerwacja"
										>
											<button className={` ${styles.button}`}>WIZYTA DOMOWA W POŁAŃCU</button>
										</Link>
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

export default Hero;
