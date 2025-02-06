
// app/continue/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface TransactionStatus {
    status: boolean;
    products: Array<{
        name: string;
        url: string;
    }>;
    customer: {
        email: string;
    };
}

export default function ContinuePage() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<TransactionStatus | null>(null);
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
                const data = await response.json();
                setStatus(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Wystąpił błąd');
            } finally {
                setLoading(false);
            }
        };

        // Sprawdzaj status co 3 sekundy przez maksymalnie 5 minut
        const maxAttempts = 100; // 5 minut (100 * 3 sekundy)
        let attempts = 0;
        
        const intervalId = setInterval(async () => {
            attempts++;
            
            const result = await checkStatus();
            
            // Jeśli transakcja została zakończona lub przekroczono limit prób
            if (status?.status || attempts >= maxAttempts) {
                clearInterval(intervalId);
            }
        }, 3000);

        // Pierwsze sprawdzenie
        checkStatus();

        return () => clearInterval(intervalId);
    }, [searchParams]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Sprawdzanie statusu płatności...</h2>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">Wystąpił błąd</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!status) {
        return null;
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">
                    {status.status 
                        ? "Płatność zakończona pomyślnie!" 
                        : "Oczekiwanie na potwierdzenie płatności..."}
                </h2>
                
                {status.status && (
                    <>
                        <p className="text-green-600 mb-4">
                            Wysłaliśmy link do pobrania na adres email: {status.customer.email}
                        </p>
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Zakupione produkty:</h3>
                            <ul className="list-none">
                                {status.products.map((product, index) => (
                                    <li key={index} className="mb-2">
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}