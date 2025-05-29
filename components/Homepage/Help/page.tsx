import styles from "./Help.module.scss";
import Button from "../../repeated/button/page";
import { getPreferredLocale } from "../../../helpers/getLocale";
import { getDictionary } from "../../../lib/dictionary";

async function Hero() {
  const lang = getPreferredLocale() as "pl" | "en";

  const { FirstSection } = await getDictionary(lang) as {
    FirstSection: {
      title: string;
      subtitle: string;
      items: { title: string; description: string; link: string }[];
    };
  };

  return (
    <>
      <section className={styles.Help}>
        <div className="Container">
          <div className={styles.topSection}>
            <h2>{FirstSection.title}</h2>
            <p>{FirstSection.subtitle}</p>
          </div>
          <div className={styles.itemWraper}>
            {FirstSection.items.map((item, index) => (
              <div key={index} className={styles.bottomItem}>
                <h4>{item.title}</h4>
                <div className={styles.longText}>
                  <p>{item.description}</p>
                </div>
                <Button link={item.link} link1="" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
