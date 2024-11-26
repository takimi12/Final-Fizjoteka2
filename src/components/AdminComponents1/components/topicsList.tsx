import styles from "./TopicList.module.scss";
import Link from "next/link";
import Image from "next/image";
import RemoveTopic from "../RemoveTopic";
import EditTopic from "../EditTopic";
import Circle from "../../../../public/assets/Filmy-i-ebooki/circle.svg"

type Topic = {
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
};

type TopicsListProps = {
  topics: Topic[];
};

export default function TopicsList({ topics }: TopicsListProps) {
 

  return (
    <div className={`mx-auto py-8 ${styles.localContainer}`}>
      {topics.map((product) => (
        <div key={product._id} className={`${styles.singleProduct}`}>
          <span className={`${styles.availableTop}`}>Produkty dostępny</span>
          <div className={`${styles.productPhoto}`}>
            <Image src={product.imageFileUrl} alt="product" width={300} height={300} />
          </div>
          <div className={`${styles.textWraper} w-full`}>
            <div className={`${styles.cardTitle}`}>
              <Link className={`${styles.anchor}`} href="">
                <h4>{product.title}</h4>
              </Link>
              <span className={`${styles.underLink}`}>{product.subtitle}</span>
            </div>
            <p className={`${styles.mainText}`}>{product.description}</p>
            <div className={`${styles.circle}`}>
              <Image src={Circle} width={15} height={15} alt="circle" />
              <p>Produkt dostępny</p>
            </div>
            <div className={`${styles.priceParent} flex items-center justify-end`}>
              <p className={`${styles.amount} font-bold`}>{product.price} zł</p>
            </div>
          </div>
          <div className={styles.actionGroup}>
            <EditTopic id={product._id} />
            <RemoveTopic id={product._id} />
          </div>
        </div>
      ))}
    </div>
  );
}
