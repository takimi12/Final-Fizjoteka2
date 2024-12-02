import React from "react";
import Link from "next/link";
import styles from "./Admin.module.scss";
import { LogoutButton } from "./LogOut";

export default async function Admin() {
  return (
    <>

      <div className={`Container ${styles.adminBar}`}>
        <div className={` ${styles.linkWrapper}`}>
          <Link href="/admin/produkty">
            <button className={styles.linkButton}>Dodawanie produktów</button>
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <Link href="/admin/newsletter">
            <button className={styles.linkButton}>
              Kontakty zapisane do newslettera
            </button>
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <Link href="/admin/kodyRabatowe">
            <button className={styles.linkButton}>
              Dodawanie kodów rabatowych
            </button>
          </Link>
        </div>
        <LogoutButton />
      </div>
    </>
  );
}
