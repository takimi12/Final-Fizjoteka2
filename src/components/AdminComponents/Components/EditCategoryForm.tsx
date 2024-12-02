"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./EditCategoryForm.module.scss";

interface EditTopicFormProps {
  id: string;
  title: string;
  subtitle1: string;
  subtitle2: string;
  subtitle3: string;
  price: number;
  category: string;
  description: string;
  imageFileUrl: string;
}

export default function EditTopicForm({
  id,
  title,
  subtitle1,
  subtitle2,
  subtitle3,
  price,
  category,
  description,
  imageFileUrl,
}: EditTopicFormProps) {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newSubtitle1, setNewSubTitle1] = useState<string>(subtitle1);
  const [newSubtitle2, setNewSubTitle2] = useState<string>(subtitle2);
  const [newSubtitle3, setNewSubTitle3] = useState<string>(subtitle3);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newPrice, setNewPrice] = useState<number>(price);
  const [newCategory, setNewCategory] = useState<string>(category);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newImageUrl = imageLink;

    if (changeImage && imageFile) {
      const imageName = imageLink.split("/").pop();

      try {
        await fetch(`http://localhost:3000/api/deleteAmazonObj`, {
          method: "DELETE",
          body: JSON.stringify({ fileName: imageName }),
        });

        const formData = new FormData();
        formData.append("file", imageFile);

        const res = await fetch(`http://localhost:3000/api/addAmazonObj`, {
          method: "POST",
          body: formData,
        });

        const newFileUrl = await res.json();
        newImageUrl = newFileUrl.fileUrl;
      } catch (err) {}
    }

    try {
      const res = await fetch(`http://localhost:3000/api/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newSubtitle1,
          newSubtitle2,
          newSubtitle3,
          newDescription,
          newPrice,
          newCategory,
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
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                className={styles.input}
                type="text"
                placeholder="Topic Title"
              />
              <input
                onChange={(e) => setNewSubTitle1(e.target.value)}
                value={newSubtitle1}
                className={styles.input}
                type="text"
                placeholder="Subtitle 1"
              />
              <input
                onChange={(e) => setNewSubTitle2(e.target.value)}
                value={newSubtitle2}
                className={styles.input}
                type="text"
                placeholder="Subtitle 2"
              />
              <input
                onChange={(e) => setNewSubTitle3(e.target.value)}
                value={newSubtitle3}
                className={styles.input}
                type="text"
                placeholder="Subtitle 3"
              />
              <input
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                className={styles.input}
                type="text"
                placeholder="Description"
              />
              <input
                onChange={(e) => setNewCategory(e.target.value)}
                value={newCategory}
                className={styles.input}
                type="text"
                placeholder="Category"
              />
              <input
                onChange={(e) => setNewPrice(Number(e.target.value))}
                value={newPrice}
                className={styles.input}
                type="text"
                placeholder="Price"
              />
              <input
                type="file"
                accept="image/*"
                className={styles.input}
                onChange={handleImageFileChange}
              />

              <button className={styles.submitButton}>Edytuj kategorię</button>
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
        <button
          className='button'
          onClick={() => setShowPopup(true)}
        >
          Edytuj kategorię
        </button>
      </div>
    </>
  );
}
