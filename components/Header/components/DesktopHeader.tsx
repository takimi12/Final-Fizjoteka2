"use client";

import styles from "./Header.module.scss";
import youTubeIcon from "../../../public/assets/Header/youtube.svg";
import instagramIcon from "../../../public/assets/Header/instagram.svg";
import facebookIcon from "../../../public/assets/Header/facebook.svg";
import tikTokIcon from "../../../public/assets/Header/tiktok.svg";
import Logo from "../../../public/assets/Header/Logo.svg";
import cart from "../../../public/assets/Header/cart.svg";
import search from "../../../public/assets/Header/Search.svg";
import Image from "next/image";
import Link from "next/link";
import ActiveLink from "../../ActiveLink/ActiveLink";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, selectTotalPrice, CartItem } from "../../../app/Redux/Cartslice";
import LocaleSwitcher from "./LocaleSwitcher";
import { Locale } from "../../../i18n";
import { RootState } from "../../../app/Redux/Store" 

type Navigation = {
	home: string;
	blog: string;
	filmyIEbooki: string;
	kursNoszenia: string;
	fizQuiz: string;
	oMnie: string;
	wizyta: string;
};

const Header = ({ navigation, lang }: { navigation: Navigation; lang: Locale }) => {
	const [isSticky, setIsSticky] = useState(false);

	const item: CartItem[] = useSelector((state: RootState) => state.cart);
	const totalPrice: number = useSelector(selectTotalPrice);
	const cartItems: CartItem[] = useSelector((state: RootState) => state.cart);

	const dispatch = useDispatch();

	const handleRemoveFromCart = (item: CartItem) => {
		dispatch(removeFromCart({ _id: item._id }));
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
			<div className={` ${styles.topHeader} py-2`}>
				<div className={`${styles.inner} flex justify-center gap-8`}>
					<Image src={youTubeIcon} className={styles.headerImage} alt="YouTube" width={15} height={15} />
					<Image src={instagramIcon} className={styles.headerImage} alt="Instagram" width={15} height={15} />
					<Image src={facebookIcon} className={styles.headerImage} alt="Facebook" width={15} height={15} />
					<Image src={tikTokIcon} className={styles.headerImage} alt="TikTok" width={15} height={15} />
				</div>
			</div>
			<div className={`${isSticky ? styles.sticky : ""} ${styles.bottom}`}>
				<div className={`${styles.bottomContainer} Container`}>
					<div className={styles.bottomContainerInner}>
						<div className={styles.logo}>
							<Link href="/" className={styles.logos}>
								<Image src={Logo} width={200} height={200} alt="Logo" />
							</Link>
						</div>
						<div className={styles.links}>
							<ActiveLink href="/" className={styles.anchor} activeClassName={styles.anchorActive}>
								{navigation.home}
							</ActiveLink>
							<ActiveLink className={styles.anchor} href="/blog">
								{navigation.blog}
							</ActiveLink>
							<ActiveLink className={styles.anchor} href="/filmy-i-ebooki">
								{navigation.filmyIEbooki}
							</ActiveLink>
							<ActiveLink className={styles.anchor} href="/kurs-noszenia">
								{navigation.kursNoszenia}
							</ActiveLink>
							<ActiveLink className={styles.anchor} href="/o-mnie">
								{navigation.oMnie}
							</ActiveLink>
							<ActiveLink className={styles.anchor} href="/wizyta">
								{navigation.wizyta}
							</ActiveLink>

							<LocaleSwitcher />

							<div className={styles.cart}>
								<div>
									{item.length > 0 && <span className={styles.numberCart}>{item.length}</span>}
									<Image src={cart} width={20} height={20} alt="cart" />
								</div>
								<div className={styles.cartContent}>
									<h4 className={` ${styles.myCart}`}>Mój koszyk</h4>
									<span className={` ${styles.desc}`}>Sprawdź i zapłać za produkty</span>
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
																className={`btn ${styles.button}`}
																onClick={() => handleRemoveFromCart(item)}
															>
																X
															</button>
														</div>
													))}
													<div className={`flex ${styles.sum}`}>
														<p className={styles.text}>Liczba: {item.length}</p>
														<p className={styles.text}>Suma: {totalPrice.toFixed(2)} zł</p>
													</div>
													<div className={styles.payment}>
														<Link href="/pl/koszyk">
															<button className="button">Zapłać</button>
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

							<Link href="/search" className={styles.anchor}>
								<Image src={search} width={20} height={20} alt="search" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
