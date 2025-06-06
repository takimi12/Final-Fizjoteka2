import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./button.module.scss";
import Arrow from "../../../public/assets/HomePage/Help/arrow.jsx";

const CustomButton = ({ link, link1 }: { link: string; link1: string }) => {

	console.log(link, 'link')
	return link !== "" ? (
		<Link className={` ${styles.decoration}`} href={`${link}`}>
		<button className={`${styles.button} `}>
			Dołącz <Arrow />
		</button>
	</Link>
	) : (
		<Link className={` ${styles.decoration}`} href={`${link}`}>
			<button className={`${styles.button} `}>
				Zobacz <Arrow />
			</button>
		</Link>
	
	);
};

export default CustomButton;
