import React from "react" ;
import Form from "./components/Form";
import Link from "next/link";
import styles from "./Footer.module.scss";
import instagramIcon from "../../../public/assets/Header/instagram.svg";
import facebookIcon from "../../../public/assets/Header/facebook.svg";
import tikTokIcon from "../../../public/assets/Header/tiktok.svg";
import youtubeIcon from "../../../public/assets/Header/youtube.svg";
import login from "../../../public/assets/Footer/Login.svg";
import Image from "next/image";
import TopFooter from "./components/TopSection";

const Footer = () => {
	return (
		<>
			<TopFooter />

			<footer className={` ${styles.footer}`}>
				<div className={` ${styles.container} Container`}>
					<div className={` flex flex-col justify-center`}>
						<span>mgr Magdalena Adaś</span>
						<span>magdalena.adas@gmail.com</span>
					</div>
					<div className={` flex flex-col justify-center`}>
						<Link href="">Polityka prywatności</Link>
						<Link href="">Regulamin sklepu</Link>
					</div>

					<div className={`${styles.icons}  `}>
						<Link href="/login">
							<Image src={login} width={25} height={25} alt="login" />
						</Link>
						<Link href="/login">
							<Image src={facebookIcon} width={25} height={25} alt="login" />
						</Link>
						<Link href="/login">
							<Image src={instagramIcon} width={25} height={25} alt="login" />
						</Link>
						<Link href="/login">
							<Image src={youtubeIcon} width={25} height={25} alt="login" />
						</Link>
						<Link href="/login">
							<Image src={tikTokIcon} width={25} height={25} alt="login" />
						</Link>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
