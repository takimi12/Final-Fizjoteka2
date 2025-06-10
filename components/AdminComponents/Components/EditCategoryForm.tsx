"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./EditCategoryForm.module.scss";

interface EditTopicFormProps {
	id: string;
	title: string;
	subtitle1: string;
	subtitle2: string;
	subtitle3: string;
	category: string;
	description: string;
	imageFileUrl: string;
}

interface FormData {
	newTitle: string;
	newSubtitle1: string;
	newSubtitle2: string;
	newSubtitle3: string;
	newDescription: string;
	newCategory: string;
}

export default function EditTopicForm({
	id,
	title,
	subtitle1,
	subtitle2,
	subtitle3,
	category,
	description,
	imageFileUrl,
}: EditTopicFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			newTitle: title,
			newSubtitle1: subtitle1,
			newSubtitle2: subtitle2,
			newSubtitle3: subtitle3,
			newDescription: description,
			newCategory: category,
		},
	});

	const [imageLink, setImageLink] = useState<string>(imageFileUrl);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [changeImage, setChangeImage] = useState<boolean>(false);

	const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChangeImage(true);
		if (e.target.files) {
			setImageFile(e.target.files[0]);
		}
	};

	const router = useRouter();

	const onSubmit = async (data: FormData) => {
		let newImageUrl = imageLink;

		if (changeImage && imageFile) {
			const imageName = imageLink.split("/").pop();

			try {
				await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/deleteAmazonObj`, {
					method: "DELETE",
					body: JSON.stringify({ fileName: imageName }),
				});

				const formData = new FormData();
				formData.append("file", imageFile);

				const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/addAmazonObj`, {
					method: "POST",
					body: formData,
				});

				const newFileUrl = await res.json();
				newImageUrl = newFileUrl.fileUrl;
			} catch (err) {
				return null;
			}
		}

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/category/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					...data,
					imageFileUrl: newImageUrl,
				}),
			});

			if (res.ok) {
				setShowPopup(false);
				router.refresh();
			} else {
				throw new Error("Failed to update the topic");
			}
		} catch (error) {}
	};

	return (
		<>
			{showPopup && (
				<div className={styles.popupBackground}>
					<div className={styles.popup}>
						<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
							<input
								{...register("newTitle", { required: "Title is required" })}
								className={styles.input}
								type="text"
								placeholder="Topic Title"
							/>
							{errors.newTitle && <p className={styles.error}>{errors.newTitle.message}</p>}

							<input
								{...register("newSubtitle1", { required: "Subtitle 1 is required" })}
								className={styles.input}
								type="text"
								placeholder="Subtitle 1"
							/>
							{errors.newSubtitle1 && <p className={styles.error}>{errors.newSubtitle1.message}</p>}

							<input
								{...register("newSubtitle2", { required: "Subtitle 2 is required" })}
								className={styles.input}
								type="text"
								placeholder="Subtitle 2"
							/>
							{errors.newSubtitle2 && <p className={styles.error}>{errors.newSubtitle2.message}</p>}

							<input
								{...register("newSubtitle3", { required: "Subtitle 3 is required" })}
								className={styles.input}
								type="text"
								placeholder="Subtitle 3"
							/>
							{errors.newSubtitle3 && <p className={styles.error}>{errors.newSubtitle3.message}</p>}

							<input
								{...register("newDescription", { required: "Description is required" })}
								className={styles.input}
								type="text"
								placeholder="Description"
							/>
							{errors.newDescription && (
								<p className={styles.error}>{errors.newDescription.message}</p>
							)}

							<input
								{...register("newCategory", { required: "Category is required" })}
								className={styles.input}
								type="text"
								placeholder="Category"
							/>
							{errors.newCategory && <p className={styles.error}>{errors.newCategory.message}</p>}

							<input
								type="file"
								accept="image/*"
								className={styles.input}
								onChange={handleImageFileChange}
							/>

							<button type="submit" className={styles.submitButton}>
								Edytuj kategorię
							</button>
							<button
								type="button"
								className={styles.closeButton}
								onClick={() => setShowPopup(false)}
							>
								Zamknij okno
							</button>
						</form>
					</div>
				</div>
			)}
			<div>
				<button className="button" onClick={() => setShowPopup(true)}>
					Edytuj kategorię
				</button>
			</div>
		</>
	);
}
