import React from "react";
import styles from "./TopSection.module.scss";
import Image from "next/image";
import check from "../../../public/assets/Footer/Checkin.svg";
import Form from "./Form";

const TopFooter = () => {
	return (
		<>
			<div className={` ${styles.newsletter} `}>
				<div className={`Container  ${styles.newsletterContainer}`}>
					<h2 className={` ${styles.mainHeading}`}>Nadal masz wątpliwości?</h2>
				</div>

				<div className={` ${styles.container} Container `}>
					<div className={`${styles.left} flex flex-col `}>
						<div className={`${styles.top} flex items-center gap-3`}>
							<Image src={check} width={50} height={50} alt="logo" />
							<h3>Wszystkie produkty objęte są gwarancją jakości.</h3>
						</div>
						<div className={`${styles.bottom} flex flex-col`}>
							<p>Jestem pewna jakości opracowanych przeze mnie materiałów.</p>
							<p>
								Jeśli jednak po zakupie nie spełnią one Twoich indywidualnych oczekiwań wystarczy,
								że napiszesz do mnie a otrzymasz zwrot pieniędzy.
							</p>
							<p>
								Możesz również zacząć od darmowego pierwszego rozdziału e-booka. Wypełnij formularz
								zapisu na newsletter, a wyślę go na podany adres mailowy.
							</p>
							<p>
								Masz pytanie dotyczące oferty? Koniecznie napisz do mnie maila lub wiadomość na
								Facebooku.
							</p>
						</div>
					</div>
					<Form />
				</div>
			</div>
		</>
	);
};

export default TopFooter;
