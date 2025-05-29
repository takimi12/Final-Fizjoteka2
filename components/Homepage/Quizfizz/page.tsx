import Image from "next/image";
import Photo from "../../../public/assets/HomePage/Fizquizz/fizquiz.webp";
import styles from "./Quizfizz.module.scss";
import Link from "next/link";
import { getPreferredLocale } from "../../../helpers/getLocale";
import { getDictionary } from "../../../lib/dictionary";

async function Quizfizz() {
  const lang = getPreferredLocale() as "pl" | "en";

  const { QuizSection } = await getDictionary(lang) as {
    QuizSection: {
      title: string;
      description1: string;
      description2: string;
      button: {
        text: string;
        link: string;
      };
    };
  };

  const { title, description1, description2, button } = QuizSection;

  return (
    <>
      <section className={`${styles.Quiz}`}>
        <div className={`Container ${styles.container}`}>
          <div className={`${styles.topSection}`}>
            <h2>{title}</h2>
          </div>
          <div className={`${styles.bottomSection}`}>
            <div className={`${styles.inner}`}>
              <div className={`${styles.leftSection}`}>
                <div className={`${styles.text}`}>
                  <p>{description1}</p>
                  <p>{description2}</p>
                </div>
                <div className={`${styles.button}`}>
                  <Link href={button.link}>
                    <button>{button.text}</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className={`${styles.rightSection}`}>
              <div className={`${styles.image}`}>
                <Image src={Photo} alt={title} width={361} height={322} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Quizfizz;
