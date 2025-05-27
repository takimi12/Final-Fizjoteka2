import React from "react";
import styles from "./NotFound.module.scss";
import NotFoundImage from "../public/assets/NotFound/background.svg";
import Image from "next/image";

const PageNotFound: React.FC = () => {
	return (
		<div className={` Container ${styles.container}`}>
			<div className={styles.iconBox}>
				<Image className={styles.Image} src={NotFoundImage} alt="imagenotfound" />
			</div>
			<div className={styles.textSection}>
				<p className={styles.message}>Strona nie została znaleziona</p>
				<p className={styles.subMessage}>Przepraszamy, ale strona o podanym adresie nie istnieje</p>
				<button className={styles.button}>Wróć na stronę główną</button>
			</div>
		</div>
	);
};

export default PageNotFound;
