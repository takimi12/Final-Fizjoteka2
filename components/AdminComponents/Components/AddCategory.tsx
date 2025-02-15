"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./AddCategory.module.scss";

interface FormData {
	title: string;
	subtitle1: string;
	subtitle2: string;
	subtitle3: string;
	description: string;
	category: string;
	price: string;
}

const AddCategory = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [showPopup, setShowPopup] = useState(false);
	const [uploading, setUploading] = useState(false);

	const router = useRouter();

	const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.name.includes(" ")) {
			alert("Nazwa pliku nie może zawierać spacji.");
			e.target.value = "";
			return;
		}
		setImageFile(file || null);
	};

	const onSubmit = async (data: FormData) => {
		if (!imageFile) {
			alert("Proszę wybrać plik obrazu.");
			return;
		}

		setUploading(true);

		const formData = new FormData();
		formData.append("image", imageFile);

		try {
			const s3Response = await fetch("/api/s3-uploadCategory", {
				method: "POST",
				body: formData,
			});

			if (!s3Response.ok) {
				throw new Error("Failed to upload files to S3");
			}

			const s3Data = await s3Response.json();
			const imageFileUrl = s3Data.imageUrl;

			const mongoResponse = await fetch("/api/category", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...data,
					imageFileUrl,
				}),
			});

			if (mongoResponse.ok) {
				setShowPopup(false);
				router.refresh();
			} else {
				throw new Error("Failed to create a category");
			}
		} catch (error) {
		} finally {
			setUploading(false);
		}
	};

	return (
		<>
			<button onClick={() => setShowPopup(true)} className={styles.button}>
				Dodaj nową kategorię
			</button>
			{showPopup && (
				<div className={styles.popupBackground}>
					<div className={styles.popup}>
						<button onClick={() => setShowPopup(false)}>Zamknij okno</button>
						<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
							<input
								{...register("title", { required: "Title is required" })}
								className={styles.input}
								type="text"
								placeholder="Topic Title"
							/>
							{errors.title && <p>{errors.title.message?.toString()}</p>}

							<input
								{...register("subtitle1", { required: "Subtitle 1 is required" })}
								className={styles.input}
								type="text"
								placeholder="Topic Subtitle"
							/>
							{errors.subtitle1 && <p>{errors.subtitle1.message?.toString()}</p>}

							<input
								{...register("subtitle2", { required: "Subtitle 2 is required" })}
								className={styles.input}
								type="text"
								placeholder="Topic Subtitle"
							/>
							{errors.subtitle2 && <p>{errors.subtitle2.message?.toString()}</p>}

							<input
								{...register("subtitle3", { required: "Subtitle 3 is required" })}
								className={styles.input}
								type="text"
								placeholder="Topic Subtitle"
							/>
							{errors.subtitle3 && <p>{errors.subtitle3.message?.toString()}</p>}

							<input
								{...register("description", { required: "Description is required" })}
								className={styles.input}
								type="text"
								placeholder="Topic Description"
							/>
							{errors.description && <p>{errors.description.message?.toString()}</p>}

							<input
								{...register("category", { required: "Category is required" })}
								className={styles.input}
								type="text"
								placeholder="Category"
							/>
							{errors.category && <p>{errors.category.message?.toString()}</p>}

							<input
								{...register("price", { required: "Price is required", pattern: { value: /^\d+$/, message: "Invalid price" } })}
								className={styles.input}
								type="text"
								placeholder="Price"
							/>
							{errors.price && <p>{errors.price.message?.toString()}</p>}

							<input type="file" accept="image/*" onChange={handleImageFileChange} />
							<button type="submit" className="button" disabled={uploading}>
								{uploading ? "Dodawanie..." : "Dodaj kategorię"}
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default AddCategory;