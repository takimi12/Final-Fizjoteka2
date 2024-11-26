import styles from "./Help.module.scss";
import Link from "next/link";
import Button from "../../repeated/button/page";

async function Hero() {
	const data = [
		{
			title: "Blog",
			paragraph:
				"Koniecznie zajrzyj do zakładki Blog. Każdego miesiąca szuka na nim porady ponad 50 tys. osób. To najchętniej czytany blog o tej tematyce!",
			paragraphbold:
				" To najchętniej czytany blog o tej tematyce!",
			link: "blog",
		},
		{
			title: "Filmy i ebooki",
			paragraph:
				"W zakładce Filmy i e-booki znajdziesz nagrania moich najpopularniejszych webinarów oraz poradnik na temat asymetrii ułożeniowej.",
			link: "filmy-i-ebooki",
		},
		{
			title: "Konsultacje",
			paragraph:
				"Bezpośrednio pomagam pacjentom na wizytach domowych oraz online. Więcej na ten temat znajdziesz w zakładce O mnie.",
			link: "wizyta",
		},
	];

	return (
		<>
			<section className={`${styles.Help}`}>
				<div className={`Container`}>
					<div className={`${styles.topSection}`}>
						<h2>Jak mogę Ci pomóc?</h2>
						<p className={` mb-5`}>
							Na e-fizjotece znajdziesz artykuły oraz filmy i e-booki z poradami fizjoterapeuty.
						</p>
					</div>
					<div className={` ${styles.itemWraper}`}>
						{data.map((item, index) => (
							<div key={index} className={`${styles.bottomItem}`}>
								<h4>{item.title}</h4>
								<div className={` ${styles.longText}`}>
								<p>{item.paragraph}</p>
								{item.paragraphbold && <p className={`font-bold`}>{item.paragraphbold}</p>}
								</div>
								<Button  link={item.link} link1="" />
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default Hero;
