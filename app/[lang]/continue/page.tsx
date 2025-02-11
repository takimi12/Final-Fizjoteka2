'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from "./Page.module.scss"

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
    const [status, setStatus] = useState<Status | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log(status)

    useEffect(() => {
        const orderId = searchParams.get('orderId');
        if (!orderId) {
            setError('Brak identyfikatora zamówienia');
            setLoading(false);
            return;
        }

        const checkStatus = async () => {
            try {
                const response = await fetch(`/api/przelewy24/status?orderId=${orderId}`);
                if (!response.ok) {
                    throw new Error('Błąd podczas sprawdzania statusu');
                }
                const data: Status = await response.json();
                setStatus(data);
                if (!data.status) {
                    setError('Wystąpił błąd. Proszę o kontakt mejlowy z obsługą sklepu.');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Wystąpił błąd');
            } finally {
                setLoading(false);
            }
        };

        checkStatus();
        const intervalId = setInterval(checkStatus, 3000);
        return () => clearInterval(intervalId);
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
