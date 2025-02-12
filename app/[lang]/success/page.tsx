'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from "./Success.module.scss";

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
    p24Status: {
        error?: string;
        processingStatus?: string;
    };
}

export default function ContinuePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<Status | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [attempts, setAttempts] = useState(0);
    const MAX_ATTEMPTS = 40; // 2 minuty (40 * 3 sekundy)

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
                    setStatus(data);
                    setAttempts(prev => prev + 1);

                    if (data.state === 'success') {
                        return;
                    }

                    if (data.state === 'success') {
                        router.push('/error');
                        return;
                    }

                    if (attempts >= MAX_ATTEMPTS) {
                        router.push('/error?message=timeout');
                        return;
                    }

                    if (!response.ok) {
                        let errorMessage = 'Wystąpił błąd. Proszę spróbować ponownie później.';
                        if (response.status === 404) {
                            errorMessage = 'Nie znaleziono zamówienia. Sprawdź poprawność identyfikatora.';
                        } else if (response.status === 500) {
                            errorMessage = 'Problem techniczny po stronie serwera. Proszę spróbować ponownie później.';
                        }
                        setError(errorMessage);
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
    }, [searchParams, attempts, router]);

    const getStatusMessage = () => {
        if (!status) return '';
        
        switch (status.state) {
            case 'pending':
                return 'Oczekiwanie na rozpoczęcie płatności...';
            case 'processing':
                return 'Przetwarzanie płatności...';
            case 'success':
                return 'Płatność zakończona sukcesem!';
            default:
                return status.p24Status?.error || 'Sprawdzanie statusu płatności...';
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={`Container ${styles.container}`}>
                {loading ? (
                    <p>Ładowanie...</p>
                ) : error ? (
                    <>
                        <h2 style={{ color: 'red' }}>Wystąpił błąd</h2>
                        <p>{error}</p>
                    </>
                ) : (
                    status && (
                        <>
                            <h2>{getStatusMessage()}</h2>
                            <div className={styles.statusInfo}>
                                <h3>Szczegóły zamówienia:</h3>
                                <p>Nazwa: {status.products[0]?.name || 'Brak danych'}</p>
                                <p>Cena: {status.products[0]?.price || 'Brak danych'} PLN</p>
                                <p>Email: {status.customer?.email || 'Brak danych'}</p>
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    );
}