'use client';

import styles from "./Header.module.scss";
import youTubeIcon from "../../../../public/assets/Header/youtube.svg";
import instagramIcon from "../../../../public/assets/Header/instagram.svg";
import facebookIcon from "../../../../public/assets/Header/facebook.svg";
import tikTokIcon from "../../../../public/assets/Header/tiktok.svg";
import Logo from "../../../../public/assets/Header/Logo.svg";
import cart from "../../../../public/assets/Header/cart.svg";
import search from "../../../../public/assets/Header/Search.svg";
import Image from "next/image";
import Link from "next/link";
import ActiveLink from "../../ActiveLink/ActiveLink";
import { useEffect, useState } from "react";
import LocalSwitcher from "@/components/localSwitcher/localSwitcher";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectTotalPrice } from '../../../app/Redux/Cartslice';



const Header = () => {
	const [isSticky, setIsSticky] = useState(false);
	const item = useSelector((state)=>state.cart)

	const dispatch = useDispatch();
	const totalPrice = useSelector(selectTotalPrice);

const cartItems = useSelector((state) => state.cart);



const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
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

        <header >
			<div className={` ${styles.topHeader} py-2`}>
				<div className={`${styles.inner} flex justify-center gap-8 `}>
					<div className={` flex justify-center gap-10`}>
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
			<div className={` ${isSticky ? styles.sticky : ""} ${styles.bottom}`}>
				<div className={`${styles.bottomContainer} Container`}>
					<div className={styles.bottomContainerInner}>
						<div className={styles.logo}>
							<Link className={styles.logos} href="/">
								<Image src={Logo} width={200} height={200} alt="Logo" />
							</Link>
						</div>
						<div className={styles.links}>
							<ActiveLink href="/" className={styles.anchor} activeClassName={styles.anchorActive}>
								Start
							</ActiveLink>
							<Link className={styles.anchor} href="/blog">
								Blog
							</Link>
							<Link className={styles.anchor} href="/filmy-i-ebooki">
								Filmy i ebooki
							</Link>
							<Link className={styles.anchor} href="/filmy-i-ebooki/Nauka-noszenia">
								Kurs noszenia
							</Link>
							<Link className={styles.anchor} href="/fizquiz">
								FizQuiz
							</Link>
							<Link className={styles.anchor} href="/o-mnie">
								O mnie
							</Link>
							<Link className={styles.anchor} href="/wizyta">
								Wizyta
							</Link>

							<LocalSwitcher />
							<div className={styles.cart}>

				<div>
					
  {item.length > 0 && (
					<span className={styles.numberCart}>{item.length}</span>
					)}
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
		<>
        <div key={item.id} className={styles.innerCard}>
				<div className={styles.detailsCard}>
					<div>
			<p className={styles.desc}>{item.title}</p>
          <p className={styles.descPrice}>{item.price} zł</p>
		  </div>
          <Image  width={70} height={70} src={item.imageFileUrl} alt='img' />
			</div>
			<div>
		  </div>

          <button className={`btn ${styles.button}`} onClick={() => handleRemoveFromCart(item)}>X</button>
        </div>
		<div>

		</div>
      </>
	  ))}
	  <div >
	  		<div className={`flex  ${styles.sum}`}>
				<p className={` ${styles.text}`}>
			liczba : {item.length}
			</p>
			<p className={` ${styles.text}`}>
			Suma:       {totalPrice.toFixed(2)}
		</p>
 		</div>
		<div className={` ${styles.payment}`}>
		<Link href="/pl/koszyk">
			<button className="button">Zapłać</button>
		</Link>
		</div>
		 </div>
    </>
  ) : (
    <div className="HeaderCart_cartBottom__m83Kt">
      <small>Dodaj pierwszy element do koszyka</small>
    </div>
  )}
</div>

									</div>
								</div>
							</div>

							<Link href="/search" className={styles.anchor}>
								<Image src={search} width={20} height={20} alt="cart" />
							</Link>
						</div>
					</div>
				</div>
			</div>

		</header>
	);
};

export default Header;
