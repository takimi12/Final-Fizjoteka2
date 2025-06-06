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
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectTotalPrice, CartItem } from "../../../Redux/Cartslice";
import search from "../../../public/assets/Header/Search.svg";
import LocaleSwitcher from "./LocaleSwitcher";
import { paths } from "../../../app/address/adress";
import { RootState } from "../../../Redux/Store";

const Header = () => {
	const [isSticky, setIsSticky] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCartHidden, setIsCartHidden] = useState(false);

	// Selektory dla koszyka
	const cartItems: CartItem[] = useSelector((state: RootState) => state.cart);
	const totalPrice: number = useSelector(selectTotalPrice);

	const dispatch = useDispatch();

	const handleRemoveFromCart = (item: CartItem) => {
		dispatch(removeFromCart({ _id: item._id }));
	};

	const handlePaymentClick = () => {
		setIsCartHidden(true);
		setTimeout(() => {
			setIsCartHidden(false);
		}, 500);
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

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

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
							alt="Instagram"
							width={15}
							height={15}
						/>
					</div>
					<div>
						<Image
							src={facebookIcon}
							className={styles.headerImage}
							alt="Facebook"
							width={15}
							height={15}
						/>
					</div>
					<div>
						<Image
							src={tikTokIcon}
							className={styles.headerImage}
							alt="TikTok"
							width={15}
							height={15}
						/>
					</div>
				</div>
			</div>
			<div className={` ${isSticky ? styles.sticky : ""}`}>
				<div className={`${styles.subContainer} Container`}>
					<div className={styles.bottomContainerInner}>
						<div className={styles.logo}>
							<Link className={styles.logos} href={paths.HOME}>
								<Image src={Logo} width={200} height={200} alt="Logo" />
							</Link>
						</div>

						<div className={` ${styles.rightSide} `}>
							<div className={`${styles.cart} ${isCartHidden ? styles.cartHidden : ""}`}>
								<div>
									{cartItems.length > 0 && (
										<span className={styles.numberCart}>{cartItems.length}</span>
									)}
									<Image src={cart} width={20} height={20} alt="cart" />
								</div>
								<div className={styles.cartContent}>
									<h4 className={styles.myCart}>Mój koszyk</h4>
									<span className={styles.desc}>Sprawdź i zapłać za produkty</span>
									<div className={styles.noProducts}>
										<div>
											{cartItems.length > 0 ? (
												<>
													{cartItems.map((item) => (
														<div key={item._id} className={styles.innerCard}>
															<div className={styles.detailsCard}>
																<div>
																	<p className={styles.desc}>{item.title}</p>
																	<p className={styles.descPrice}>{item.price} zł</p>
																</div>
																<Image
																	width={70}
																	height={70}
																	src={item.imageFileUrl}
																	alt="Product Image"
																/>
															</div>
															<button
																className={`button`}
																onClick={() => handleRemoveFromCart(item)}
															>
																X
															</button>
														</div>
													))}
													<div className={styles.sum}>
														<p className={styles.text}>Liczba: {cartItems.length}</p>
														<p className={styles.text}>Suma: {totalPrice.toFixed(2)} zł</p>
													</div>
													<div className={styles.payment}>
														<Link href={paths.KOSZYK}>
															<button className="button" onClick={handlePaymentClick}>
																Zapłać
															</button>
														</Link>
													</div>
												</>
											) : (
												<small>Dodaj pierwszy element do koszyka</small>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className={styles.hamburger}>
								<button className={` button`} onClick={openModal}>
									<Image src={hamburger} width={15} height={15} alt="menu" />
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
								<Link href={paths.SEARCH} className={styles.anchor} onClick={closeModal}>
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
