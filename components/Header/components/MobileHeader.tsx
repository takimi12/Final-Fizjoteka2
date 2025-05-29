"use client";

import styles from "./MobileHeader.module.scss";
import youTubeIcon from "../../../public/assets/Header/youtube.svg";
import instagramIcon from "../../../public/assets/Header/instagram.svg";
import facebookIcon from "../../../public/assets/Header/facebook.svg";
import tikTokIcon from "../../../public/assets/Header/tiktok.svg";
import Logo from "../../../public/assets/Header/Logo.svg";
import cart from "../../../public/assets/Header/cart.svg";
import hamburger from "../../../public/assets/Header/hamburger.svg";
import Image from "next/image";
import Link from "next/link";
import ActiveLink from "../../ActiveLink/ActiveLink";
import { useEffect, useState } from "react";
import search from "../../../public/assets/Header/Search.svg";
import LocaleSwitcher from "./LocaleSwitcher";
import { paths } from "../../../app/address/adress";

const Header = () => {
	const [isSticky, setIsSticky] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<header>
			<div className={` ${styles.topHeader} `}>
				<div className={` ${styles.inner} `}>
					<div className={` `}>
						<Image
							src={youTubeIcon}
							className={styles.headerImage}
							alt="YouTube"
							width={15}
							height={15}
						/>
					</div>
					<div>
						<Image
							src={instagramIcon}
							className={styles.headerImage}
							alt="YouTube"
							width={15}
							height={15}
						/>
					</div>
					<div>
						<Image
							src={facebookIcon}
							className={styles.headerImage}
							alt="YouTube"
							width={15}
							height={15}
						/>
					</div>
					<div>
						<Image
							src={tikTokIcon}
							className={styles.headerImage}
							alt="YouTube"
							width={15}
							height={15}
						/>
					</div>
				</div>
			</div>
			<div className={` ${isSticky ? styles.sticky : ""}`}>
  <div className={` Container`}>
    <div className={styles.bottomContainerInner}>
      <div className={styles.logo}>
        <Link className={styles.logos} href={paths.HOME}>
          <Image src={Logo} width={200} height={200} alt="Logo" />
        </Link>
      </div>

      <div className={` ${styles.rightSide} `}>
        <div className={styles.cart}>
          <Image src={cart} width={20} height={20} alt="cart" />
        </div>
        <div className={styles.hamburger}>
          <button className={` button`} onClick={openModal}>
            <Image src={hamburger} width={15} height={15} alt="cart" />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

{isModalOpen && (
  <div className={styles.modalBackdrop} onClick={closeModal}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <div className={styles.modalHeaderWraper}>
        <div className={`${styles.modalHeader} `}>
          <div className={styles.logo}>
            <Link className={styles.logos} href={paths.HOME}>
              <Image src={Logo} width={200} height={200} alt="Logo" />
            </Link>
          </div>
          <button className={` button`} onClick={closeModal}>
            ×
          </button>
        </div>
        <div className={`${styles.links}`}>
          <ActiveLink
            href={paths.HOME}
            className={styles.anchor}
            activeClassName={styles.anchorActive}
            onClick={closeModal}
          >
            Start
          </ActiveLink>
          <Link className={styles.anchor} href={paths.BLOG} onClick={closeModal}>
            Blog
          </Link>
          <Link className={styles.anchor} href={paths.FILMY_EBOOKI} onClick={closeModal}>
            Filmy i ebooki
          </Link>
          <Link className={styles.anchor} href={paths.KURS_NOSZENIA} onClick={closeModal}>
            Kurs noszenia
          </Link>
          <Link className={styles.anchor} href={paths.O_MNIE} onClick={closeModal}>
            O mnie
          </Link>
          <Link className={styles.anchor} href={paths.WIZYTA} onClick={closeModal}>
            Wizyta
          </Link>
          <LocaleSwitcher />
          <Link href={paths.SEARCH} className={styles.anchor}>
            <Image src={search} width={20} height={20} alt="search" />
          </Link>
        </div>
      </div>
    </div>
  </div>
)}

		</header>
	);
};

export default Header;
