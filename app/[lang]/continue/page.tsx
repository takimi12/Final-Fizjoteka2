import React from 'react';
import styles from './Page.module.scss'; 
import Image from 'next/image';
import Check from "../../../public/assets/Continue/check.svg"

const Page = ({searchParams }:{searchParams: {orderId:string}}) => {
  console.log("sa", searchParams )
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
              <Image
              src={Check}
              width={50}
              height={50}
              alt='check'
              />
          </div>
          <div className={styles.textCenter}>
            <h1 className={styles.title}>Płatność zatwierdzona!</h1>
            <p className={styles.subtitle}>
              Dziękujemy za dokonanie zakupu. Twoje zamówienie zostało pomyślnie zrealizowane.
            </p>
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.infoBox}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Status</span>
              <span className={styles.statusPaid}>Opłacone</span>
            </div>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <button className={styles.buttonDefault}>Przejdź do szczegółów zamówienia</button>
          <button className={styles.buttonOutline}>Wróć do strony głównej</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
