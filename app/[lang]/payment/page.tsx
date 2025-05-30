"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SuccessPage from "./success/SuccessPage";
import ErrorPage from "./error/ErrorPage";
import styles from "./Payment.module.scss";

interface OrderData {
	orderId: string;
	productName: string;
	productPrice: number;
	email: string;
}

export default function ContinuePage() {
	const searchParams = useSearchParams();
	const [orderData, setOrderData] = useState<OrderData | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const orderId = searchParams.get("orderId");
		if (!orderId) {
			setErrorMessage("Brak identyfikatora zamówienia");
			setLoading(false);
			return;
		}

		const checkStatus = async () => {
			try {
				const response = await fetch(`/api/przelewy24/status?orderId=${orderId}`);
				const data = await response.json();

				if (data.state === "success") {
					setOrderData({
						orderId,
						productName: data.products[0]?.name || "Brak danych",
						productPrice: data.products[0]?.price || 0,
						email: data.customer?.email || "Brak emaila",
					});
				} else {
					setErrorMessage("Płatność nie powiodła się.");
				}
			} catch {
				setErrorMessage("Wystąpił błąd podczas sprawdzania statusu zamówienia.");
			} finally {
				setLoading(false);
			}
		};

		checkStatus();
	}, [searchParams]);

	if (loading) return;
	<div className={styles.Container}>
		<div className={`Container ${styles.inner}`}>
			<p>Ładowanie...</p>
		</div>
	</div>;

	return orderData ? (
		<SuccessPage {...orderData} />
	) : (
		<ErrorPage message={errorMessage || "Nieznany błąd"} />
	);
}
