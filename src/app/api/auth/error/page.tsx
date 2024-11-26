'use client'

import { useSearchParams } from 'next/navigation';
import styles from './error.module.css';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = '';
  switch (error) {
    case 'CredentialsSignin':
      errorMessage = 'Nieprawidłowe dane logowania. Spróbuj ponownie.';
      break;
    case 'OAuthSignin':
      errorMessage = 'Błąd podczas logowania przez OAuth. Spróbuj ponownie.';
      break;
    case 'OAuthCallback':
      errorMessage = 'Błąd podczas powrotu z OAuth. Spróbuj ponownie.';
      break;
    case 'OAuthCreateAccount':
      errorMessage = 'Błąd podczas tworzenia konta przez OAuth. Spróbuj ponownie.';
      break;
    case 'EmailCreateAccount':
      errorMessage = 'Błąd podczas tworzenia konta przez e-mail. Spróbuj ponownie.';
      break;
    case 'EmailSignin':
      errorMessage = 'Błąd podczas logowania przez e-mail. Spróbuj ponownie.';
      break;
    case 'Callback':
      errorMessage = 'Błąd podczas powrotu z uwierzytelniania. Spróbuj ponownie.';
      break;
    case 'OAuthAccountNotLinked':
      errorMessage = 'Użytkownik z tym e-mailem jest już zarejestrowany. Zaloguj się używając innej metody.';
      break;
    case 'EmailVerification':
      errorMessage = 'Błąd podczas weryfikacji e-maila. Spróbuj ponownie.';
      break;
    default:
      errorMessage = 'Wystąpił nieznany błąd. Spróbuj ponownie.';
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Błąd logowania</h1>
      <p className={styles.message}>{errorMessage}</p>
      <Link href="/pl/login" className={styles.link}>Powrót do strony logowania</Link>
    </div>
  );
}