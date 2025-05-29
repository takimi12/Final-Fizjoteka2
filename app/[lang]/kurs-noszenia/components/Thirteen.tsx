import React from "react";
import styles from "./thirteen.module.scss";
import Link from "next/link";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Thirteen() {
  const lang = getPreferredLocale() as "pl" | "en";
  const dictionary = await getDictionary(lang);
  const { call_to_action } = dictionary.kurs_noszenia;

  return (
    <section className={styles.thirteen}>
      <div className={`Container ${styles.container}`}>
        <h2>{call_to_action.title}</h2>
        <button className={`button ${styles.button}`}>
          <Link href="#products">{call_to_action.button_text}</Link>
        </button>
      </div>
    </section>
  );
}

export default Thirteen;
