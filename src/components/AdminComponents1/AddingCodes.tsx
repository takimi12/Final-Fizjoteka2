'use client';

import { useState, ReactNode, FormEvent } from 'react';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="code">Code:</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="discount">Discount:</label>
        <input
          type="number"
          id="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>
      <button type="submit">Add Code</button>
    </form>
  );
};

export default AddCode;
