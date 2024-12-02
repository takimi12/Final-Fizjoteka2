'use client';

import { useState, FormEvent } from 'react';
import styles from "./kodyRabatowe.module.scss"
import Link from 'next/link';

const AddCode = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/discountCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, discount: Number(discount) }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Code added successfully!');
      } else {
        alert('Error adding code.');
      }
    } catch (error) {
      alert('Error adding code.');
    }
  };

  return (
    <div className={`${styles.container} ${styles.modal}`}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
<button className='button'>
        <Link href="/pl/admin">
        Powrót do panelu admina
      </Link>
      </button>
          <div className={styles.codesGroup}>
            <label htmlFor="code" className={styles.label}>Treść kodu:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={styles.input}
              placeholder='wpisz kod rabatowy'
            />
          </div>
          <div className={styles.codesGroup}>
            <label htmlFor="discount" className={styles.label}>Wysokość rabatu:</label>
            <input
              type="number"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className={styles.input}
              placeholder='wpisz wysokość rabatu'
            />
          </div>
          <button type="submit" className='button'>Dodaj kod</button>
        </form>
      </div>
    </div>
  );
};

export default AddCode;