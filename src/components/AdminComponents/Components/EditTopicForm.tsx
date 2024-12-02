"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./EditTopicForm.module.scss";

interface EditTopicFormProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  category: string;
  imageFileUrl: string;
  pdfFileUrl: string;
}

export default function EditTopicForm({
  id,
  title,
  subtitle,
  description,
  price,
  category,
  imageFileUrl,
  pdfFileUrl,
}: EditTopicFormProps) {
  const [newTitle, setNewTitle] = useState(title);
  const [newSubtitle, setNewSubtitle] = useState(subtitle);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newCategory, setNewCategory] = useState(category);
  const [imageLink, setImageLink] = useState(imageFileUrl);
  const [pdfLink, setPdfLink] = useState(pdfFileUrl);
  const [showPopup, setShowPopup] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [changeImage, setChangeImage] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [changePdf, setChangePdf] = useState(false);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeImage(true);
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangePdf(true);
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
    }
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newImageUrl = imageLink;
    let newPdfUrl = pdfLink;

    if (changeImage && imageFile) {
e
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
      } catch (err) {
      }
    }

    if (changePdf && pdfFile) {

      const pdfName = pdfLink.split("/").pop();

      try {
        await fetch(`http://localhost:3000/api/deleteAmazonObj`, {
          method: "DELETE",
          body: JSON.stringify({ fileName: pdfName }),
        });

        const formData = new FormData();
        formData.append("file", pdfFile);

        const res = await fetch(`http://localhost:3000/api/addAmazonObj`, {
          method: "POST",
          body: formData,
        });

        const newFileUrl = await res.json();
        newPdfUrl = newFileUrl.fileUrl;
      } catch (err) {
      }
    }

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newSubtitle,
          newDescription,
          newPrice,
          newCategory,
          imageFileUrl: newImageUrl,
          pdfFileUrl: newPdfUrl,
        }),
      });

      if (res.ok) {
        setShowPopup(false);
        router.refresh();
      } else {
        throw new Error("Failed to update the topic");
      }
    } catch (error) {
    }
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
          onChange={(e) => setNewSubtitle(e.target.value)}
          value={newSubtitle}
          className={styles.input}
          type="text"
          placeholder="Topic Subtitle"
        />

        <input
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className={styles.input}
          type="text"
          placeholder="Topic Description"
        />

        <input
          onChange={(e) => setNewCategory(e.target.value)}
          value={newCategory}
          className={styles.input}
          type="text"
          placeholder="Topic Category"
        />

        <input
          onChange={(e) => setNewPrice(e.target.value)}
          value={newPrice}
          className={styles.input}
          type="text"
          placeholder="Topic Price"
        />

        <input
          type="file"
          accept="image/*"
          className={styles.input}
          onChange={handleImageFileChange}
        />

        <input
          type="file"
          accept="application/pdf"
          className={styles.input}
          onChange={handlePdfFileChange}
        />

        <button className={styles.submitButton}>Edytuj produkt</button>
        <button onClick={() => setShowPopup(false)} className={styles.closeButton}>
          Zamknij okno
        </button>
      </form>
    </div>
  </div>
)}
<div>
  <button onClick={() => setShowPopup(true)} className='button'>
    Edytuj produkt
  </button>
</div>

    </>
  );
}