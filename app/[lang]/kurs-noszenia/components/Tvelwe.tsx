import React from "react";
import styles from "./Tvelve.module.scss";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Tvelwe() {
  const lang = getPreferredLocale() as "pl" | "en";
  const dictionary = await getDictionary(lang);
  const { course_content } = dictionary.kurs_noszenia;

  return (
    <section className={styles.tvelve}>
      <div className={`Container ${styles.container}`}>
        <div>
          <h2>{course_content.title}</h2>
          <h6 className={styles.subtitle}>{course_content.subtitle}</h6>
        </div>
        <div className={styles.wraper}>
          {course_content.modules.map((module, index) => (
            <div key={index} className={styles.card}>
              <h5>{module.title}</h5>
          
              <ul className={styles.ul}>
                {module.content.map((point, idx) => (
                  <li key={idx} className={styles.point}>
                    <span className={styles.pointer}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tvelwe;
