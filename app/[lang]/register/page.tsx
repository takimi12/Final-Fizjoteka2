'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./Register.module.scss";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements[0] as HTMLInputElement).value;
    const email = (form.elements[1] as HTMLInputElement).value;
    const password = (form.elements[2] as HTMLInputElement).value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError("This email is already registered");
      } else if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("An error occurred, please try again");
    }
  };

  return (
    sessionStatus !== "authenticated" && (
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Rejestracja</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.input}
              placeholder="Name"
              required
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Email"
              required
            />
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
              required
            />
            <button type="submit" className={styles.submitButton}>
              Zarejestruj się
            </button>
            <p className={styles.errorMessage}>{error && error}</p>
          </form>
        </div>
      </div>
    )
  );
};

export default Register;
