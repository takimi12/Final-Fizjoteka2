'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, AlertCircle, Loader2, Clock, RefreshCw } from 'lucide-react';

type PaymentStatus = 
  | 'loading' 
  | 'success' 
  | 'pending' 
  | 'wrong_amount'
  | 'expired'
  | 'error'
  | 'cancelled';
// changing
interface StatusConfig {
  icon: React.ReactNode;
  title: string;
  message: string;
  showRetry: boolean;
  color: string;
}

const Page = ({ searchParams }: { searchParams: { orderId: string; error?: string } }) => {
  const [status, setStatus] = useState<PaymentStatus>('loading');
  const router = useRouter();

  const statusConfigs: Record<PaymentStatus, StatusConfig> = {
    loading: {
      icon: <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />,
      title: "Sprawdzanie płatności",
      message: "Sprawdzamy status Twojej płatności...",
      showRetry: false,
      color: "text-blue-500"
    },
    success: {
      icon: <Check className="h-12 w-12 text-green-500" />,
      title: "Płatność zatwierdzona",
      message: "Płatność została zrealizowana pomyślnie. Sprawdź swoją skrzynkę email.",
      showRetry: false,
      color: "text-green-500"
    },
    pending: {
      icon: <Clock className="h-12 w-12 text-yellow-500" />,
      title: "Oczekiwanie na wpłatę",
      message: "Oczekujemy na potwierdzenie Twojej płatności. To może potrwać do 15 minut.",
      showRetry: true,
      color: "text-yellow-500"
    },
    wrong_amount: {
      icon: <AlertCircle className="h-12 w-12 text-orange-500" />,
      title: "Nieprawidłowa kwota",
      message: "Otrzymaliśmy płatność o nieprawidłowej kwocie. Skontaktuj się z obsługą klienta.",
      showRetry: true,
      color: "text-orange-500"
    },
    expired: {
      icon: <Clock className="h-12 w-12 text-red-500" />,
      title: "Płatność wygasła",
      message: "Czas na dokonanie płatności upłynął. Możesz spróbować zapłacić ponownie.",
      showRetry: true,
      color: "text-red-500"
    },
    error: {
      icon: <AlertCircle className="h-12 w-12 text-red-500" />,
      title: "Błąd płatności",
      message: "Wystąpił błąd podczas realizacji płatności. Spróbuj ponownie lub skontaktuj się z obsługą.",
      showRetry: true,
      color: "text-red-500"
    },
    cancelled: {
      icon: <AlertCircle className="h-12 w-12 text-gray-500" />,
      title: "Płatność anulowana",
      message: "Płatność została anulowana. Możesz spróbować zapłacić ponownie.",
      showRetry: true,
      color: "text-gray-500"
    }
  };

  useEffect(() => {
    const checkTransactionStatus = async () => {
      if (!searchParams.orderId) {
        setStatus('error');
        return;
      }

      if (searchParams.error) {
        switch (searchParams.error) {
          case 'payment_expired':
            setStatus('expired');
            break;
          case 'wrong_amount':
            setStatus('wrong_amount');
            break;
          case 'payment_cancelled':
            setStatus('cancelled');
            break;
          default:
            setStatus('error');
        }
        return;
      }

      try {
        const response = await fetch(`/api/transactions/${searchParams.orderId}`);
        const data = await response.json();

        if (data.status === true) {
          setStatus('success');
        } else if (data.status === 'pending') {
          setStatus('pending');
          setTimeout(checkTransactionStatus, 30000);
        } else if (data.status === 'wrong_amount') {
          setStatus('wrong_amount');
        } else if (data.status === 'expired') {
          setStatus('expired');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    checkTransactionStatus();
  }, [searchParams.orderId, searchParams.error]);

  const handleRetry = async () => {
    try {
      const response = await fetch(`/api/transactions/${searchParams.orderId}/retry`, {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const currentStatus = statusConfigs[status];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h2 className={`text-xl font-semibold text-center ${currentStatus.color}`}>
            {currentStatus.title}
          </h2>
        </div>
        <div className="flex flex-col items-center space-y-4">
          {currentStatus.icon}
          <p className="text-center text-lg">{currentStatus.message}</p>
          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            {currentStatus.showRetry && (
              <button 
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Zapłać ponownie
              </button>
            )}
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Wróć do strony głównej
            </button>
            {status !== 'success' && (
              <button 
                onClick={() => router.push('/koszyk')}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                Wróć do koszyka
              </button>
            )}
          </div>
          {status === 'error' && (
            <p className="text-sm text-gray-500 mt-4">
              Jeśli problem się powtarza, skontaktuj się z naszym wsparciem technicznym:
              <br />
              <a href="mailto:support@example.com" className="text-blue-500 hover:underline">
                support@example.com
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
