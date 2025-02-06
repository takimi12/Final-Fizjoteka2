'use client'
import React, { useEffect, useState } from 'react';
import styles from './Page.module.scss';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

// Statusy powinny być zgodne z możliwymi odpowiedziami z API Przelewy24
type PaymentStatus = 'SUCCESS' | 'PENDING' | 'FAILURE' | 'NOT_FOUND' | 'ERROR';

const Page = ({ searchParams }: { searchParams: { orderId?: string } }) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('PENDING');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        if (!searchParams.orderId) {
          setPaymentStatus('ERROR');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/payment/status?orderId=${searchParams.orderId}`);
        
        if (!response.ok) {
          throw new Error('Błąd podczas sprawdzania statusu');
        }

        const data = await response.json();
        
        switch (data.status) {
          case 'SUCCESS':
            setPaymentStatus('SUCCESS');
            break;
          case 'PENDING':
            setPaymentStatus('PENDING');
            break;
          case 'FAILURE':
            setPaymentStatus('FAILURE');
            break;
          default:
            setPaymentStatus('ERROR');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setPaymentStatus('ERROR');
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [searchParams.orderId]);

  const getStatusContent = () => {
    if (loading) {
      return {
        title: "Weryfikacja płatności...",
        subtitle: "Proszę czekać, sprawdzamy status Twojej płatności",
        statusText: "Weryfikacja",
        statusClass: styles.statusPending
      };
    }

    switch (paymentStatus) {
      case 'SUCCESS':
        return {
          title: "Płatność zatwierdzona!",
          subtitle: "Dziękujemy za dokonanie zakupu. Twoje zamówienie zostało pomyślnie zrealizowane.",
          statusText: "Opłacone",
          statusClass: styles.statusPaid
        };
      case 'PENDING':
        return {
          title: "Płatność w trakcie realizacji",
          subtitle: "Twoja płatność jest obecnie przetwarzana. Sprawdź status później.",
          statusText: "Oczekujące",
          statusClass: styles.statusPending
        };
      case 'FAILURE':
        return {
          title: "Płatność nieudana",
          subtitle: "Wystąpił problem podczas przetwarzania płatności. Spróbuj ponownie.",
          statusText: "Nieudane",
          statusClass: styles.statusFailed
        };
      default:
        return {
          title: "Wystąpił błąd",
          subtitle: "Nie możemy zweryfikować statusu płatności. Skontaktuj się z supportem.",
          statusText: "Błąd",
          statusClass: styles.statusError
        };
    }
  };

  const content = getStatusContent();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
          
          </div>
          <div className={styles.textCenter}>
            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.subtitle}>
              {content.subtitle}
            </p>
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.infoBox}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Status</span>
              <span className={content.statusClass}>{content.statusText}</span>
            </div>
            {searchParams.orderId && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Numer zamówienia</span>
                <span className={styles.orderId}>{searchParams.orderId}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.cardFooter}>
          {paymentStatus === 'SUCCESS' ? (
            <button 
              className={styles.buttonDefault}
              onClick={() => {/* Logika pobierania plików */}}
            >
              Pobierz materiały
            </button>
          ) : (
            <button
              className={styles.buttonDefault}
              onClick={() => router.push('/koszyk')}
            >
              Spróbuj ponownie
            </button>
          )}
          <button 
            className={styles.buttonOutline}
            onClick={() => router.push('/')}
          >
            Wróć do strony głównej
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;