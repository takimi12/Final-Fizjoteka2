import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface P24Status {
    isExpired: boolean;
    isRejected: boolean;
    rejectionReason?: string;
    lastChecked?: Date;
    methodId?: number;
    orderId?: number;
}

interface PaymentStatus {
    state: 'pending' | 'completed' | 'expired' | 'error';
    p24Status: P24Status;
    customer?: {
        email: string;
    };
    products?: Array<{
        name: string;
        price: number;
    }>;
}

export default function ContinuePage() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<PaymentStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [checkCount, setCheckCount] = useState(0);


    console.log(status)

    useEffect(() => {
        const sessionId = searchParams.get('sessionId');
        if (!sessionId) {
            setError('Brak identyfikatora zamówienia');
            setLoading(false);
            return;
        }

        const checkStatus = async () => {
            try {
                const response = await fetch(`/api/przelewy24/status?sessionId=${sessionId}`);
                if (!response.ok) {
                    throw new Error('Błąd podczas sprawdzania statusu');
                }
                const data = await response.json();
                setStatus(data);
                
                // If completed or error, stop checking
                if (data.state === 'completed' || data.state === 'error' || data.state === 'expired') {
                    return true;
                }
                return false;
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Wystąpił błąd');
                return true;
            } finally {
                setLoading(false);
            }
        };

        const intervalId = setInterval(async () => {
            setCheckCount(prev => {
                if (prev >= 100) { // Max 5 minutes of checking (100 * 3 seconds)
                    clearInterval(intervalId);
                    return prev;
                }
                return prev + 1;
            });

            const shouldStop = await checkStatus();
            if (shouldStop) {
                clearInterval(intervalId);
            }
        }, 3000);

        checkStatus();

        return () => clearInterval(intervalId);
    }, [searchParams]);

    const renderStatusContent = () => {
        if (!status) return null;

        switch (status.state) {
            case 'pending':
                return (
                    <div className="text-yellow-600">
                        <h2 className="text-xl font-semibold mb-4">Oczekiwanie na wpłatę</h2>
                        <p>Twoja płatność jest w trakcie przetwarzania. Prosimy o cierpliwość.</p>
                        <p className="mt-2 text-sm text-gray-500">
                            Sprawdzono {checkCount} {checkCount === 1 ? 'raz' : 'razy'}
                        </p>
                    </div>
                );

            case 'expired':
                return (
                    <div className="text-red-600">
                        <h2 className="text-xl font-semibold mb-4">Płatność wygasła</h2>
                        <p>Czas na dokonanie płatności upłynął. Prosimy spróbować ponownie.</p>
                        <button 
                            onClick={() => window.location.href = '/checkout'}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Spróbuj ponownie
                        </button>
                    </div>
                );

            case 'error':
                return (
                    <div className="text-red-600">
                        <h2 className="text-xl font-semibold mb-4">Błąd płatności</h2>
                        <p>Wystąpił błąd podczas przetwarzania płatności.</p>
                        {status.p24Status.rejectionReason && (
                            <p className="mt-2 text-sm">Powód: {status.p24Status.rejectionReason}</p>
                        )}
                        <button 
                            onClick={() => window.location.href = '/checkout'}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Spróbuj ponownie
                        </button>
                    </div>
                );

            case 'completed':
                return (
                    <div className="text-green-600">
                        <h2 className="text-xl font-semibold mb-4">Płatność zakończona pomyślnie!</h2>
                        {status.customer?.email && (
                            <p>Wysłaliśmy link do pobrania na adres email: {status.customer.email}</p>
                        )}
                        {status.products && status.products.length > 0 && (
                            <div className="mt-6">
                                <h3 className="font-semibold mb-2">Zakupione produkty:</h3>
                                <ul className="list-none">
                                    {status.products.map((product, index) => (
                                        <li key={index} className="mb-2">
                                            {product.name} - {product.price} PLN
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <p className="mt-4 text-sm text-gray-600">
                            ID zamówienia: {status.p24Status.orderId}
                        </p>
                    </div>
                );
        }
    };

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
                    <button 
                        onClick={() => window.location.href = '/checkout'}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Powrót do koszyka
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center max-w-lg p-6 bg-white rounded-lg shadow-lg">
                {renderStatusContent()}
            </div>
        </div>
    );
}