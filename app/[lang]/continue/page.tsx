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


    console.log(status, 'added console log')

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
                
                if (!response.ok) {
                    let errorMessage = 'Wystąpił błąd. Proszę spróbować ponownie później.';
                    if (response.status === 404) {
                        errorMessage = 'Nie znaleziono zamówienia. Sprawdź poprawność identyfikatora.';
                    } else if (response.status === 500) {
                        errorMessage = 'Problem techniczny po stronie serwera. Proszę spróbować ponownie później.';
                    }
                    throw new Error(errorMessage);
                }

                const data: Status = await response.json();
                
                if (!data || !data.status) {
                    throw new Error('Wystąpił błąd. Proszę o kontakt mejlowy z obsługą sklepu.');
                }
                
                if (!data.products || data.products.length === 0) {
                    throw new Error("Brak produktów w zamówieniu.");
                }
                
                if (isMounted) {
                    setStatus(data);
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

    if (error) {
        return (
            <div className={styles.wrapper}>
                <div className={`Container ${styles.container}`}>
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            </div>
        );
    }

    if (status && status.state === 'success') {
        return (
            <div className={styles.wrapper}>
                <div className={`Container ${styles.container}`}>
                    <h2 style={{ color: 'green' }}>Płatność zakończona sukcesem!</h2>
                    <h3>Złożone zamówienie:</h3>
                    <p>Nazwa: {status.products[0].name}</p>
                    <p>Cena: {status.products[0].price} PLN</p>
                    <p>Na podany e-mail: {status.customer.email} zostało wysłane zamówienie. W przypadku, gdyby e-mail nie dotarł, prosimy o kontakt telefoniczny.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={`Container ${styles.container}`}>
                <h2 style={{ color: 'red' }}>Wystąpił błąd</h2>
                <p>Proszę o kontakt mejlowy z obsługą sklepu.</p>
            </div>
        </div>
    );
}
