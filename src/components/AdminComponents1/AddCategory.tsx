'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './add.module.scss';

const AddTopic = () => {
  const [title, setTitle] = useState('');
  const [subtitle1, setSubTitle1] = useState('');
  const [subtitle2, setSubTitle2] = useState('');
  const [subtitle3, setSubTitle3] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const handleImageFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file && file.name.includes(' ')) {
      alert('Nazwa pliku nie może zawierać spacji.');
      e.target.value = null; // Czyszczenie wartości inputa (opcjonalne)
      return;
    }
    setImageFile(file);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!title || !subtitle1 || !subtitle2 || !subtitle3 || !description || !category || !price ||!imageFile ) {
      alert('Title, description, category, and price are required.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("image", imageFile);
     try {
      // Upload to S3
      const s3Response = await fetch("/api/s3-uploadCategory", {
        method: "POST",
        body: formData,
      });

      if (!s3Response.ok) {
        throw new Error("Failed to upload files to S3");
      }
      // Get S3 response data
      const s3Data = await s3Response.json();
      const imageFileUrl = s3Data.imageUrl;
 
      // Submit data to MongoDB
      const mongoResponse = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, subtitle1, subtitle2, subtitle3, description, category, price,imageFileUrl }),
      });

      if (mongoResponse.ok) {
        setTitle('');
        setSubTitle1('');
        setSubTitle2('');
        setSubTitle3('');
        setDescription('');
        setImageFile(null); 
        setCategory('');
        setPrice('');
        setShowPopup(false);
        router.refresh();
      } else {
        throw new Error('Failed to create a category');
      }
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className={`bg-primary text-primary-inverse px-4 py-2 rounded ${styles.button}`}
      >
        Dodaj nową kategorię
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
                onChange={(e) => setSubTitle1(e.target.value)}
                value={subtitle1}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Subtitle"
              />
              <input
                onChange={(e) => setSubTitle2(e.target.value)}
                value={subtitle2}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Subtitle"
              />
              <input
                onChange={(e) => setSubTitle3(e.target.value)}
                value={subtitle3}
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
              <input
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Category"
              />
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
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover focus:outline-none focus:bg-primary-hover text-primary-inverse py-3 px-6 rounded"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Add Topic'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTopic;
