"use client";
import { useState } from "react";
import axios from "axios";

interface FormData {
	amount: number;
	currency: string;
	description: string;
	email: string;
}

export default function Home() {
	const [formData, setFormData] = useState<FormData>({
		amount: 12345,
		currency: "PLN",
		description: "Test payment",
		email: "test@example.com",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: name === "amount" ? Number(value) : value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/payment`, formData);
		} catch (error) {}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Amount</label>
				<input type="number" name="amount" value={formData.amount} onChange={handleChange} />
			</div>
			<div>
				<label>Currency</label>
				<input type="text" name="currency" value={formData.currency} onChange={handleChange} />
			</div>
			<div>
				<label>Description</label>
				<input
					type="text"
					name="description"
					value={formData.description}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Email</label>
				<input type="email" name="email" value={formData.email} onChange={handleChange} />
			</div>
			<button type="submit">Pay</button>
		</form>
	);
}
