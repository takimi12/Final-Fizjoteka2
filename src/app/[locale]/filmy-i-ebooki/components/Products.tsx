import styles from "./Products.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "../../../../components/AdminComponents/Subcomponents/button";
// import Circle from "../../../../public/assets/Filmy-i-ebooki/circle.svg";


interface Product {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  categories: string[];
  price: string;
  imageFileUrl: string;
  pdfFileUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TopicsListProps {
  filteredTopics: Product[];
}

export default function TopicsList({ filteredTopics }: TopicsListProps) {
  return (
    <>
      {filteredTopics.map((product) => (
        <div key={product._id} className={`${styles.singleProduct}`}>
          <span className={`${styles.availableTop}`}>Produkty dostępny</span>
          <div className={`${styles.productPhoto}`}>
            <Image src={product.imageFileUrl} alt="product" width={300} height={300} />
          </div>
          <div className={`${styles.textWraper} w-full`}>
            <div className={`${styles.cardTitle}`}>
              <Link href="">
                <h4 className={styles.anchor}>{product.title}</h4>
              </Link>
              <span className={`${styles.underLink}`}>{product.subtitle}</span>
            </div>
            <p className={`${styles.mainText}`}>{product.description}</p>
            <div className={`${styles.circle}`}>
              {/* <Image src={Circle} width={15} height={15} alt="circle" /> */}
              <p>Produkt dostępny</p>
            </div>
            <div className={`${styles.circle}`}></div>
            <div className={`${styles.priceParent} flex items-center justify-end`}>
              <p className={`${styles.amount} font-bold`}>{product.price} zł</p>
              <Button product={product} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
