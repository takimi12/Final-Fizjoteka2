"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./Admin.module.scss";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { adminPaths } from "../../address/adress";

export default function Admin() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "loading") {
      return;
    }

    if (!session || session?.user?.role !== "admin") {
      router.push("/login");
    }
  }, [session, sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className={`${styles.container} ${styles.adminBar}`}>
        <div className={styles.linkWrapper}>
          <Link href={adminPaths.PRODUCTS}>
            <button className={styles.linkButton}>Dodawanie produktów</button>
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <Link href={adminPaths.NEWSLETTER}>
            <button className={styles.linkButton}>Kontakty zapisane do newslettera</button>
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <Link href={adminPaths.DISCOUNT_CODES}>
            <button className={styles.linkButton}>Dodawanie kodów rabatowych</button>
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <button
            onClick={() => {
              signOut();
            }}
            className={styles.logoutButton}
          >
Wyloguj się
          </button>
        </div>
      </div>
    </>
  );
}
