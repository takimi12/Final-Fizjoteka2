"use client";
import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import styles from "./RemoveCategoryForm.module.scss";

interface RemoveBtnProps {
	id: string;
	imageFileUrl: string;
}

export default function RemoveBtn({ id, imageFileUrl }: RemoveBtnProps) {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const router = useRouter();

	const removeTopic = async () => {
		setIsDeleting(true);
		setError(null);

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/category?id=${id}`, {
				method: "DELETE",
			});

			if (!res.ok) {
				throw new Error("Nie udało się usunąć tematu");
			}

			const imageName = imageFileUrl.split("/").pop();

			try {
				await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/deleteAmazonObj`, {
					method: "DELETE",
					body: JSON.stringify({ fileName: imageName }),
				});
			} catch (err) {
			}

			router.refresh();
		} catch (error) {
			setError("Wystąpił błąd podczas usuwania kategorii.");
		} finally {
			setIsDeleting(false);
			setShowConfirmation(false);
		}
	};

	const handleConfirmation = () => {
		setShowConfirmation(true);
	};

	const handleCancel = () => {
		setShowConfirmation(false);
	};

	return (
		<div>
			<button onClick={handleConfirmation} className={styles.button} disabled={isDeleting}>
				<HiOutlineTrash size={24} />
			</button>

			{showConfirmation && (
				<div className={styles.confirmationModal}>
					<div className={styles.modalContent}>
						<p>Czy na pewno chcesz usunąć tę kategorię?</p>
						<div className={styles.modalButtons}>
							<button onClick={removeTopic} disabled={isDeleting}>
								{isDeleting ? "Usuwanie..." : "Tak, usuń"}
							</button>
							<button onClick={handleCancel}>Anuluj</button>
						</div>
					</div>
				</div>
			)}

			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
}