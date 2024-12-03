'use client';
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddTopic.module.scss";

interface S3UploadResponse {
  imageUrl: string;
  pdfUrl: string;
}

const AddTopic: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const router = useRouter();

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.name.includes(" ")) {
      alert("Nazwa pliku nie może zawierać spacji.");
      e.target.value = ""; 
      return;
    }
    setImageFile(file);
  };

  const handlePdfFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.name.includes(" ")) {
      alert("Nazwa pliku nie może zawierać spacji.");
      e.target.value = ""; 
      return;
    }
    setPdfFile(file);
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !subtitle || !description || !imageFile || !pdfFile || categories.length === 0 || !price) {
      alert("Title, subtitle, description, image, pdf, categories, and price are required.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("pdf", pdfFile);

    try {
      const s3Response = await fetch("/api/s3-uploadTopic", {
        method: "POST",
        body: formData,
      });

      if (!s3Response.ok) {
        throw new Error("Failed to upload files to S3");
      }

      const s3Data: S3UploadResponse = await s3Response.json();
      const imageFileUrl = s3Data.imageUrl;
      const pdfFileUrl = s3Data.pdfUrl;

      const mongoResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/topics`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, subtitle, description, categories, price, imageFileUrl, pdfFileUrl }),
      });

      if (mongoResponse.ok) {
        setTitle("");
        setSubTitle("");
        setDescription("");
        setCategories([]);
        setPrice("");
        setImageFile(null);
        setPdfFile(null);
        setShowPopup(false);
        router.refresh();
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.error("ERROR", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
 <button
  onClick={() => setShowPopup(true)}
  className={styles.button}
>
  Dodaj nowy produkt
</button>
{showPopup && (
  <div className={styles.popupBackground}>
    <div className={styles.popup}>
      <button onClick={() => setShowPopup(false)}>Zamknij okno</button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={styles.input}
          type="text"
          placeholder="Topic Title"
        />
        <input
          onChange={(e) => setSubTitle(e.target.value)}
          value={subtitle}
          className={styles.input}
          type="text"
          placeholder="Topic Subtitle"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={styles.input}
          type="text"
          placeholder="Topic Description"
        />
        <div className={styles.categoryContainer}>
          <div className={styles.categoryInputContainer}>
            <input
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
              className={styles.input}
              type="text"
              placeholder="New Category"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className={styles.addButton}
            >
              Dodaj kategorię
            </button>
          </div>
          <div className={styles.categoryList}>
            {categories.map((category, index) => (
              <div key={index} className={styles.categoryItem}>
                {category}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category)}
                  className={styles.removeCategoryButton}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className={styles.input}
          type="text"
          placeholder="Price"
        />
        <input type="file" accept="image/*" onChange={handleImageFileChange} />
        <input type="file" accept="application/pdf" onChange={handlePdfFileChange} />
        <button
          type="submit"
          className="button"
          disabled={uploading}
        >
          {uploading ? "Dodawanie..." : "Dodaj produkt"}
        </button>
      </form>
    </div>
  </div>
)}

    </>
  );
};

export default AddTopic;
