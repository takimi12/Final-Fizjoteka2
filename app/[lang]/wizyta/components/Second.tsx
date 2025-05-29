import React from "react";
import styles from "./Second.module.scss";
import Wizyta from "../../../../public/assets/Wizyta/newsletter.webp";
import Image from "next/image";
import Link from "next/link";
import { getPreferredLocale } from "../../../../helpers/getLocale";
import { getDictionary } from "../../../../lib/dictionary";

async function Second() {
  const lang = getPreferredLocale() as "pl" | "en";
  const { WizytaPage } = await getDictionary(lang);
  const { BookingSection } = WizytaPage;
  const { title, buttons } = BookingSection;

  return (
    <section className={styles.second}>
      <div className={`Container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.textCenter}>
            <h3 className={styles.mainHeading}>{title}</h3>
            <div className={styles.inner}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={Wizyta}
                  alt="Newsletter"
                  width={408}
                  height={404}
                />
              </div>
              <div className={styles.columnSection}>
                <div className={styles.buttonContainer}>
                  <Link
                    href="https://widget.zarezerwuj.pl/direct/b02f996b-e919-4357-8c78-99b006488d85"
                    target="_blank"
                    rel="noreferrer external nofollow"
                    aria-label="eFizjoteka rezerwacja"
                  >
                    <button className={styles.button}>{buttons[0]}</button>
                  </Link>
                  <button className={styles.button}>{buttons[1]}</button>
                  <Link
                    href="https://widget.zarezerwuj.pl/direct/b02f996b-e919-4357-8c78-99b006488d85"
                    target="_blank"
                    rel="noreferrer external nofollow"
                    aria-label="eFizjoteka rezerwacja"
                  >
                    <button className={styles.button}>{buttons[2]}</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Second;
