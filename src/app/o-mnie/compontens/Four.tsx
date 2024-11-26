import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Ebook/ebook_product-title.webp";
import styles from "./Four.module.scss";
import Link from "next/link";

export default async function Four() {
	return (
		<>
			<section className={`${styles.Four} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.topSection} flex flex-col items-center`}>
						<h2>Mój pierwszy e-book</h2>
						<h3 className={` ${styles.lowHeading}`}>Asymetria ułoeniowa - poradniik dla rodzica</h3>
					</div>
					<div className={`${styles.bottomSection} flex  items-center`}>
						<div className={` ${styles.inner} flex items-center`}>
							<div className={`${styles.leftSection} w-full`}>
								<div className={`${styles.image} flex justify-center`}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={`${styles.rightSection} flex w-full flex-col items-center gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
									<p>
										Jestem autorką e-booka Asymetria ułożeniowa - poradnik dla rodzica. To jedyna
										taka książka w Polsce i na świecie!
									</p>
									<p>
										Znajdziesz w niej wiedzę medyczną oraz praktyczne wskazówkami dla rodziców.
										Dowiesz się jak zapobiegać asymetrii oraz wspierać dziecko, które ma postawioną
										diagnozę.
									</p>
								</div>
								<div className={`${styles.button}`}>
									<Link href="/filmy-i-ebooki/asymetria-ulozeniowa">
										<button className="">DOWIEDZ SIĘ WIĘCEJ</button>
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
