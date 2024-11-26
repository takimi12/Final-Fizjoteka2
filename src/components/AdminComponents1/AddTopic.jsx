'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./add.module.scss";

const AddTopic = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [categories, setCategories] = useState([]); 
  const [newCategory, setNewCategory] = useState("");
  const [price, setPrice] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.includes(' ')) {
      alert('Nazwa pliku nie może zawierać spacji.');
      e.target.value = null; // Czyszczenie wartości inputa (opcjonalne)
      return;
    }
    setImageFile(file);
  };
  
  const handlePdfFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.includes(' ')) {
      alert('Nazwa pliku nie może zawierać spacji.');
      e.target.value = null; // Czyszczenie wartości inputa (opcjonalne)
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

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(category => category !== categoryToRemove));
  };

  const handleSubmit = async (e) => {
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
      // Upload to S3
      const s3Response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      if (!s3Response.ok) {
        throw new Error("Failed to upload files to S3");
      }
      // Get S3 response data
      const s3Data = await s3Response.json();
      const imageFileUrl = s3Data.imageUrl;
      const pdfFileUrl = s3Data.pdfUrl;

      // Submit data to MongoDB
      const mongoResponse = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, subtitle, description, categories, price, imageFileUrl, pdfFileUrl }),
      });

      if (mongoResponse.ok) {
        setTitle(""); // Clear input fields
        setSubTitle("");// Clear input fields
        setDescription(""); // Clear input fields
        setCategories([]); // Clear input fields
        setPrice(""); // Clear input fields
        setImageFile(null); // Clear input fields
        setPdfFile(null); // Clear input fields
        setShowPopup(false); // Close popup
        setUploading(false);
        router.refresh(); // Refresh router
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className={`bg-primary text-primary-inverse px-4 py-2 rounded ${styles.button}` }
      >
        Dodaj nowy produkt
      </button>
      {showPopup && (
        <div className={`${styles.popupBackground} bg-modal-overlay-background-color`}>
          <div className={`${styles.popup} bg-card-background-color border-card-border-color shadow-card-box-shadow`}>
            <button onClick={() => setShowPopup(false)}>Close</button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Title"
              />
              <input
                onChange={(e) => setSubTitle(e.target.value)}
                value={subtitle}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Subtitle"
              />
              <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Description"
              />

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    onChange={(e) => setNewCategory(e.target.value)}
                    value={newCategory}
                    className="border border-slate-500 px-8 py-2 flex-grow"
                    type="text"
                    placeholder="New Category"
                  />
                  <button type="button" onClick={handleAddCategory} className="bg-secondary px-4 py-2 rounded text-secondary-inverse">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded">
                      {category}
                      <button type="button" onClick={() => handleRemoveCategory(category)} className="text-red-500">&times;</button>
                    </div>
                  ))}
                </div>
              </div>

              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Price"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
              />
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfFileChange}
              />

              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover focus:outline-none focus:bg-primary-hover text-primary-inverse py-3 px-6 rounded"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Add Topic"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTopic;
