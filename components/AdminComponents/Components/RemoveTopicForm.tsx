"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./RemoveTopicForm.module.scss";

interface RemoveBtnProps {
	id: string;
	imageFileUrl?: string;
	pdfFileUrl?: string;
}

export default function RemoveBtn({ id, imageFileUrl, pdfFileUrl }: RemoveBtnProps) {
	const [imageLink, setImageLink] = useState<string>(imageFileUrl || "");
	const [pdfLink, setPdfLink] = useState<string>(pdfFileUrl || "");

	const router = useRouter();

	const removeTopic = async () => {
		const confirmed = window.confirm("Czy na pewno chcesz usunąć?");

		if (confirmed) {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/topics?id=${id}`, {
					method: "DELETE",
				});

				if (!res.ok) {
					throw new Error("Nie udało się usunąć tematu");
				}

				// Usuń plik obrazu tylko jeśli imageFileUrl istnieje
				if (imageFileUrl) {
					const imageName = imageFileUrl.split("/").pop();

					try {
						await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/deleteAmazonObj`, {
							method: "DELETE",
							body: JSON.stringify({ fileName: imageName }),
						});

						const formData = new FormData();
						formData.append("file", imageFileUrl);

						const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/addAmazonObj`, {
							method: "POST",
							body: formData,
						});

						const newFileUrl = await uploadRes.json();
						const newImageUrl = newFileUrl.fileUrl;
						setImageLink(newImageUrl);
					} catch (err) {}
				}

				// Usuń plik PDF tylko jeśli pdfFileUrl istnieje
				if (pdfFileUrl) {
					const pdfName = pdfFileUrl.split("/").pop();

					try {
						await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/deleteAmazonObj`, {
							method: "DELETE",
							body: JSON.stringify({ fileName: pdfName }),
						});
					} catch (err) {}
				}

				// Wyświetl alert o powodzeniu usunięcia
				alert("Produkt został pomyślnie usunięty!");
				
				router.refresh();
			} catch (error) {
				console.log(error)
				alert("Wystąpił błąd podczas usuwania produktu.");
			}
		}
	};

	return (
		<div>
			<button onClick={removeTopic} className={styles.button}>
				<HiOutlineTrash size={24} />
			</button>
		</div>
	);
}