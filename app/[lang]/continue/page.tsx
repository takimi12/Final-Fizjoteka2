'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Check from "../../../public/assets/Continue/check.svg";
import { useRouter } from 'next/navigation';
import styles from './Page.module.scss';

const ContinuePage = ({ searchParams }: { searchParams: { orderId: string } }) => {
  const router = useRouter();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactionStatus = async () => {
      if (!searchParams.orderId) {
        setError('Brak identyfikatora zamówienia');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/transaction/${searchParams.orderId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Błąd podczas pobierania statusu transakcji');
        }

        setTransaction(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionStatus();
  }, [searchParams.orderId]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.loading}>Ładowanie statusu zamówienia...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <p className={styles.error}>{error}</p>
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
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
            <Image
              src={Check}
              width={50}
              height={50}
              alt='check'
            />
          </div>
          <div className={styles.textCenter}>
            <h1 className={styles.title}>
              {transaction?.status 
                ? 'Płatność zatwierdzona!' 
                : 'Płatność w trakcie przetwarzania'}
            </h1>
            <p className={styles.subtitle}>
              {transaction?.status 
                ? 'Dziękujemy za dokonanie zakupu. Twoje zamówienie zostało pomyślnie zrealizowane. Sprawdź swoją skrzynkę email.'
                : 'Twoje zamówienie jest przetwarzane. Po potwierdzeniu płatności otrzymasz email z dalszymi instrukcjami.'}
            </p>
          </div>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.infoBox}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Status</span>
              <span className={transaction?.status ? styles.statusPaid : styles.statusPending}>
                {transaction?.status ? 'Opłacone' : 'W trakcie realizacji'}
              </span>
            </div>
            {transaction && (
              <>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Numer zamówienia</span>
                  <span className={styles.infoValue}>{searchParams.orderId}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoValue}>{transaction.customer?.email}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.cardFooter}>
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

export default ContinuePage;