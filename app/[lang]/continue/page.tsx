'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ContinuePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<any>(null);
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
                // 🔄 Aktualizujemy ścieżkę API na nową
                const response = await fetch(`/api/payment/status?orderId=${orderId}`);
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

        const maxAttempts = 100;
        let attempts = 0;
        
        const intervalId = setInterval(async () => {
            attempts++;
            
            await checkStatus();
            
            if (status?.state === 'success' || attempts >= maxAttempts) {
                clearInterval(intervalId);
            }
        }, 3000);

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

    if (!status) return null;

    const renderStatusContent = () => {
        switch (status.state) {
            case 'pending':
                return (
                    <div className="text-yellow-600">
                        <h2 className="text-xl font-semibold mb-4">Oczekiwanie na wpłatę</h2>
                        <p>Twoja płatność jest w trakcie przetwarzania. Prosimy o cierpliwość.</p>
                    </div>
                );
            
            case 'error':
                return (
                    <div className="text-red-600">
                        <h2 className="text-xl font-semibold mb-4">Błąd płatności</h2>
                        <p>Wystąpił błąd podczas przetwarzania płatności.</p>
                    </div>
                );
            
            case 'no_payment':
                return (
                    <div className="text-red-600">
                        <h2 className="text-xl font-semibold mb-4">Brak wpłaty</h2>
                        <p>Nie otrzymaliśmy Twojej wpłaty w wyznaczonym czasie.</p>
                    </div>
                );
            
            case 'wrong_amount':
                return (
                    <div className="text-red-600">
                        <h2 className="text-xl font-semibold mb-4">Nieprawidłowa kwota</h2>
                        <p>Otrzymana kwota ({status.amount} PLN) nie zgadza się z oczekiwaną ({status.expectedAmount} PLN).</p>
                    </div>
                );
            
            case 'success':
                return (
                    <div className="text-green-600">
                        <h2 className="text-xl font-semibold mb-4">Płatność zakończona pomyślnie!</h2>
                        <p>Wysłaliśmy link do pobrania na adres email: {status.customer.email}</p>
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Zakupione produkty:</h3>
                            <ul className="list-none">
                                {status.products.map((product: any, index: number) => (
                                    <li key={index} className="mb-2">
                                        {product.name} - {product.price} PLN
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center max-w-lg p-6 bg-white rounded-lg shadow-lg">
                {renderStatusContent()}
            </div>
        </div>
    );
}
