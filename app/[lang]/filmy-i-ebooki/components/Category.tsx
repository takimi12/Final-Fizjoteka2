import styles from "./Category.module.scss";
import Link from "next/link";
import Image from "next/image";
import Circle from "../../../../public/assets/Filmy-i-ebooki/circle.svg";
import { replacePolishChars } from "../../../../helpers/replacePolishChart";
import { ICategory } from "../../../../backend/models/category";

interface CategoryListProps {
	categories: ICategory[];
}

const Category1 = ({ categories }: CategoryListProps) => {
	return (
		<>
			{categories.map((product: ICategory) => (
				<div key={product._id} className={styles.singleProduct}>
					<span className={styles.availableTop}>FIZJOTERAPEUTA POLECA</span>
					<div className={styles.productPhoto}>
						<Image src={product.imageFileUrl} alt="product" width={300} height={300} />
					</div>
					<div className={`${styles.textWraper} `}>
						<div className={styles.cardTitle}>
								<h4 className={styles.anchor}>{product.title}</h4>
						
							<span className={styles.underLink}>
								{product.subtitle1} • {product.subtitle2} • {product.subtitle3}
							</span>
						</div>
						<p className={styles.mainText}>{product.description}</p>
						<div className={styles.circle}>
							<Image src={Circle} width={15} height={15} alt="circle" />
							<p>Produkt dostępny</p>
						</div>
						<div className={`${styles.priceParent} `}>
							<Link
								href={`/filmy-i-ebooki/${replacePolishChars(product.category.replace(/\s+/g, "-"))}`}
							>
								<button>Zobacz szczegóły</button>
							</Link>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Category1;
