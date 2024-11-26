import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Ebook/ebook_product-title.webp";
import styles from "./Ebook.module.scss";
import Link from "next/link";

export default async function Ebook() {
	return (
		<>
			<section className={`${styles.Ebook} d-flex flex-center`}>
				<div className={`Container m-auto`}>
					<div className={`${styles.topSection} flex flex-col items-center `}>
						<h2 className={` mb-3`}>Mój pierwszy e-book</h2>
						<h3>Asymetria ułoeniowa - poradniik dla rodzica</h3>
					</div>
					<div className={`${styles.bottomSection} flex  items-center`}>
						<div className={`${styles.inner}  `}>
							<div className={`${styles.leftSection} w-full`}>
								<div className={`${styles.image} flex justify-center`}>
									<Image src={Photo} alt="moj pierwszy ebook" width={361} height={322} />
								</div>
							</div>
							<div className={`${styles.rightSection} flex w-full flex-col  gap-3`}>
								<div className={`${styles.text} flex flex-col gap-3`}>
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
								<div className={`${styles.button} flex justify-center mt-3`}>
									<Link href="/filmy-i-ebooki/asymetria-ulozeniowa">
										<button >DOWIEDZ SIĘ WIĘCEJ</button>
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
