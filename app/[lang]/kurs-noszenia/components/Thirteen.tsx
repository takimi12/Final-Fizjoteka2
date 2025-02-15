import React from "react";
import styles from "./thirteen.module.scss";
import Link from "next/link";

const Thirteen = () => {
	return (
		<section className={` ${styles.thirteen}`}>
			<div className={`Container ${styles.container}`}>
				<h2>Już wiesz, że chcesz dołączyć do grona świadomych i spokojniejszych rodziców?</h2>
				<button className={`button ${styles.button}`}>
					<Link href="#products">WRÓĆ DO OFERTY</Link>
				</button>
			</div>
		</section>
	);
};

export default Thirteen;
