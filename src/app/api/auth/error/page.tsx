'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './error.module.css';
import Link from 'next/link';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Błąd logowania</h1>
      <p className={styles.message}>{error}</p>
      <Link href="/pl/login" className={styles.link}>Powrót do strony logowania</Link>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}