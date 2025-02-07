'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ContinuePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log(status, 'status')

    useEffect(() => {
        const orderId = searchParams.get('orderId');
        if (!orderId) {
            setError('Brak identyfikatora zamówienia');
            setLoading(false);
            return;
        }

        const checkStatus = async () => {
            try {
                // Make the API request to fetch the transaction status from your backend
                const response = await fetch(`/api/przelewy24/status?orderId=${orderId}`);
                
                if (!response.ok) {
                    throw new Error('Błąd podczas sprawdzania statusu');
                }

                const data = await response.json();
                setStatus(data);

                // Check for errors in the response
                if (data.error) {
                    setError(data.error);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Wystąpił błąd');
            } finally {
                setLoading(false);
            }
        };

        const maxAttempts = 100;
        let attempts = 0;
        
        const intervalId = setInterval(async () => {
            attempts++;

            await checkStatus();
            
            // Check if the status is success or if we hit the max attempts
            if (status?.state === 'success' || attempts >= maxAttempts) {
                clearInterval(intervalId);
            }
        }, 3000);

        checkStatus();

        return () => clearInterval(intervalId);
    }, [searchParams]);

    if (loading) {
        return <p>Ładowanie...</p>;
    }

    if (error) {
        return <p>Błąd: {error}</p>;
    }

    // Handle different states based on the transaction status
    let statusMessage = '';
    switch (status?.state) {
        case 'success':
            statusMessage = 'Transakcja zakończona sukcesem';
            break;
        case 'error':
            statusMessage = 'Wystąpił błąd przy transakcji';
            break;
        case 'no_payment':
            statusMessage = 'Transakcja wygasła';
            break;
        case 'wrong_amount':
            statusMessage = 'Nieprawidłowa kwota';
            break;
        default:
            statusMessage = 'Sprawdzanie statusu...';
    }

    return (
        <div>
            <h1>{statusMessage}</h1>
            {status && status.products && (
                <div>
                    <h2>Produkty:</h2>
                    <ul>
                        {status.products.map((product: any) => (
                            <li key={product.id}>{product.name} - {product.quantity} szt. - {product.price} PLN</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
