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

	if (sessionStatus === "loading") {
		return <h1>Loading...</h1>;
	}

	if (!session) {
		return (
			<div className={`${styles.container} Container`}>
				<h1>Brak dostępu</h1>
				<p>Musisz być zalogowany, aby uzyskać dostęp do tej strony.</p>
				<button 
					onClick={() => router.push("/login")}
					className={styles.linkButton}
				>
					Przejdź do logowania
				</button>
			</div>
		);
	}

	if (session?.user?.role !== "admin") {
		return (
			<div className={styles.container}>
				<h1>Brak uprawnień</h1>
				<p>Nie masz uprawnień administratora do przeglądania tej strony.</p>
				<button 
					onClick={() => signOut()}
					className={styles.logoutButton}
				>
					Wyloguj się
				</button>
			</div>
		);
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