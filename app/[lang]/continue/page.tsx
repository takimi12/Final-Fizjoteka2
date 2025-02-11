'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from "./Page.module.scss";

interface Product {
    name: string;
    price: number;
    url: string;
}

interface Customer {
    email: string;
}

interface Status {
    status: boolean;
    state: string;
    products: Product[];
    customer: Customer;
}

export default function ContinuePage() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<Status | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log(status, 'added console log');

    useEffect(() => {
        const orderId = searchParams.get('orderId');
        if (!orderId) {
            setError('Brak identyfikatora zamówienia');
            setLoading(false);
            return;
        }

        let isMounted = true;
        const checkStatus = async () => {
            try {
                const response = await fetch(`/api/przelewy24/status?orderId=${orderId}`);
                
                const data: Status = await response.json();

                if (isMounted) {
                    setStatus(data); // Zawsze zapisujemy status, nawet jeśli nie jest sukcesem

                    if (!response.ok) {
                        let errorMessage = 'Wystąpił błąd. Proszę spróbować ponownie później.';
                        if (response.status === 404) {
                            errorMessage = 'Nie znaleziono zamówienia. Sprawdź poprawność identyfikatora.';
                        } else if (response.status === 500) {
                            errorMessage = 'Problem techniczny po stronie serwera. Proszę spróbować ponownie później.';
                        }
                        setError(errorMessage);
                    } else if (!data.status || !data.products || data.products.length === 0) {
                        setError("Błąd w zamówieniu. Sprawdź szczegóły lub skontaktuj się z obsługą.");
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Wystąpił błąd. Proszę spróbować ponownie później.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        checkStatus();
        const intervalId = setInterval(checkStatus, 3000);
        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [searchParams]);

    if (loading) {
        return <p>Ładowanie...</p>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={`Container ${styles.container}`}>
                {error ? (
                    <>
                        <h2 style={{ color: 'red' }}>Wystąpił błąd</h2>
                        <p>{error}</p>
                    </>
                ) : (
                    status && (
                        <>
                            <h2 style={{ color: status.state === 'success' ? 'green' : 'red' }}>
                                {status.state === 'success' ? 'Płatność zakończona sukcesem!' : 'Zamówienie w toku lub nieudane'}
                            </h2>
                            <h3>Złożone zamówienie:</h3>
                            <p>Nazwa: {status.products[0]?.name || 'Brak danych'}</p>
                            <p>Cena: {status.products[0]?.price || 'Brak danych'} PLN</p>
                            <p>Na podany e-mail: {status.customer?.email || 'Brak danych'} zostało wysłane zamówienie.</p>
                        </>
                    )
                )}
            </div>
        </div>
    );
}
