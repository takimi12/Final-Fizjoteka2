'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from "./Page.module.scss"

interface Product {
    name: string;
    price: number;
    url: string;
}

interface Status {
    status: boolean;
    state: string;
    products: Product[];
}

export default function ContinuePage() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<Status | null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (status && status.state === 'success') {
        return (
            <div className={styles.wrapper}>
                <div className='Container'>
                <h2 style={{ color: 'green' }}>Płatność zakończona sukcesem!</h2>
                <h3>Produkt:</h3>
                <p>Nazwa: {status.products[0].name}</p>
                <p>Cena: {status.products[0].price} PLN</p>
                <p><a href={status.products[0].url} target="_blank" rel="noopener noreferrer">Pobierz produkt</a></p>
            </div>
            </div>
        );
    }

    return <p style={{ color: 'red' }}>Wystąpił błąd. Proszę o kontakt mejlowy z obsługą sklepu.</p>;
}
