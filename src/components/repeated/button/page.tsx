import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./button.module.scss";
import Arrow from "../../../../public/assets/HomePage/Help/arrow.jsx";

const CustomButton = ({ link, link1 }: { link: string; link1: string }) => {
	return link !== "" ? (
		<Link className={` ${styles.decoration}`} href={`/${link}`}>
			<button className={`${styles.button} outline`}>
				Zobacz <Arrow />
			</button>
		</Link>
	) : (
		<Link className={` ${styles.decoration}`} href={`/${link}`}>
			<button className={`${styles.button} outline`}>
				Dołącz <Arrow />
			</button>
		</Link>
	);
};

export default CustomButton;
