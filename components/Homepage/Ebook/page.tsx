import Image from "next/image";
import Photo from "../../../public/assets/HomePage/Ebook/ebook_product-title.webp";
import styles from "./Ebook.module.scss";
import Link from "next/link";

export default async function Ebook() {
	return (
		<>
			<section className={`${styles.Ebook} `}>
				<div className={`Container ${styles.container}`}>
					<div className={`${styles.topSection}  `}>
						<h2 className={``}>Mój pierwszy e-book</h2>
						<h3>Asymetria ułoeniowa - poradniik dla rodzica</h3>
					</div>
					<div className={`${styles.bottomSection} `}>
						<div className={`${styles.inner}  `}>
							<div className={`${styles.leftSection} `}>
								<div className={`${styles.image} `}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={`${styles.rightSection}`}>
								<div className={`${styles.text} `}>
									<p className={` ${styles.paragraph}`}>
										Jestem autorką e-booka Asymetria ułożeniowa - poradnik dla rodzica. To jedyna
										taka książka w Polsce i na świecie!
									</p>
									<p className={` ${styles.paragraph}`}>
										Znajdziesz w niej wiedzę medyczną oraz praktyczne wskazówkami dla rodziców.
										Dowiesz się jak zapobiegać asymetrii oraz wspierać dziecko, które ma postawioną
										diagnozę.
									</p>
								</div>
								<div className={`${styles.button} `}>
									<Link href="/filmy-i-ebooki/asymetria-ulozeniowa">
										<button>DOWIEDZ SIĘ WIĘCEJ</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
