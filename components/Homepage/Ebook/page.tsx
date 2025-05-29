import Image from "next/image";
import Photo from "../../../public/assets/HomePage/Ebook/ebook_product-title.webp";
import styles from "./Ebook.module.scss";
import Link from "next/link";
import { getPreferredLocale } from "../../../helpers/getLocale";
import { getDictionary } from "../../../lib/dictionary";

export default async function Ebook() {
  const lang = getPreferredLocale() as "pl" | "en";

  const { EbookSection } = await getDictionary(lang) as {
    EbookSection: {
      title: string;
      subtitle: string;
      description1: string;
      description2: string;
      button: {
        text: string;
        link: string;
      };
    };
  };

  const { title, subtitle, description1, description2, button } = EbookSection;

  return (
    <>
      <section className={`${styles.Ebook}`}>
        <div className={`Container ${styles.container}`}>
          <div className={`${styles.topSection}`}>
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
          </div>
          <div className={`${styles.bottomSection}`}>
            <div className={`${styles.inner}`}>
              <div className={`${styles.leftSection}`}>
                <div className={`${styles.image}`}>
                  <Image src={Photo} alt={title} width={361} height={322} />
                </div>
              </div>
              <div className={`${styles.rightSection}`}>
                <div className={`${styles.text}`}>
                  <p className={`${styles.paragraph}`}>{description1}</p>
                  <p className={`${styles.paragraph}`}>{description2}</p>
                </div>
                <div className={`${styles.button}`}>
                  <Link href={button.link}>
                    <button>{button.text}</button>
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
