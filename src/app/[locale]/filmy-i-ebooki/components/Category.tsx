import styles from "./Category.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ICategory } from "../../../../../backend/models/category";
import { replacePolishChars } from "@/helpers";
// import Circle from "../../../../public/assets/Filmy-i-ebooki/circle.svg";

interface CategoryListProps {
    filteredCategories: ICategory[];
}

const CategoryList: React.FC<CategoryListProps> = ({ filteredCategories }) => {

    return (
        <>
            {filteredCategories.map((product) => (
                <div key={product._id} className={styles.singleProduct}>
                    <span className={styles.availableTop}>FIZJOTERAPEUTA POLECA</span>
                    <div className={styles.productPhoto}>
                        <Image src={product.imageFileUrl} alt="product" width={300} height={300} />
                    </div>
                    <div className={`${styles.textWraper} w-full`}>
                        <div className={styles.cardTitle}>
                            <Link className={styles.anchor} href="">
                                <h4>{product.title}</h4>
                            </Link>
                            <span className={styles.underLink}>
                                {product.subtitle1} • {product.subtitle2} • {product.subtitle3}
                            </span>
                        </div>
                        <p className={styles.mainText}>{product.description}</p>
                        <div className={styles.circle}>
                            {/* <Image src={Circle} width={15} height={15} alt="circle" /> */}
                            <p>Produkt dostępny</p>
                        </div>
                        <div className={`${styles.priceParent} flex items-center justify-end`}>
                            <p className={`${styles.amount} font-bold`}>{product.price} zł</p>
                            <Link href={`/pl/filmy-i-ebooki/${replacePolishChars(product.category.replace(/\s+/g, '-'))}`}>
                                <button>Zobacz szczegóły</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CategoryList;
