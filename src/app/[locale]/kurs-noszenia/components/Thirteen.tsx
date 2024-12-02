import React from "react";
import styles from "./thirteen.module.scss";
import Link from "next/link";

const Tvelwe = () => {
	return (
		<section className={` flex justify-center  ${styles.thirteen}`}>
			<div className={` Container flex flex-col items-center text-center  gap-5`}>
				<h2>Już wiesz, że chcesz dołączyć do grona świadomych i spokojniejszych rodziców?</h2>
				<button className={`Button`}> <Link href="#products">WRÓĆ DO OFERTY</Link></button>
			</div>
		</section>
	);
};

export default Tvelwe;
