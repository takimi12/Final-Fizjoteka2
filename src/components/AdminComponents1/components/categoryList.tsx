import styles from "./categoryList.module.scss";
import Link from "next/link";
import Image from "next/image";
import Circle from "../../../../public/assets/Filmy-i-ebooki/circle.svg";
import RemoveCategory from "../RemoveCategory";
import EditCategory from "../EditCategory"

interface Category {
    _id: string;
    title: string;
    subtitle1: string;
    subtitle2: string;
    subtitle3: string;
    price: string;
    description: string;
    category: string;
    imageFileUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface CategoryListProps {
    categories: Category[];
  }
  
  export default async function CategoryList({ categories }: CategoryListProps) {
    return (
      <div className={` mx-auto py-8 ${styles.localContainer}`}>
        {categories.map((product) => (
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
                <Image src={Circle} width={15} height={15} alt="circle" />
                <p>Produkt dostępny</p>
              </div>
              <div className={styles.circle}></div>
              <div className={`${styles.priceParent} flex items-center justify-end`}>
                <p className={`${styles.amount} font-bold`}>{product.price} zł</p>
              </div>
            </div>
            <div className={styles.actionGroup}>
              <EditCategory id={product._id} />
              <RemoveCategory id={product._id} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  