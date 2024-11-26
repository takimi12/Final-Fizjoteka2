"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./EditTopi.module.scss";

export default function EditTopicForm({ id, title, subtitle1, subtitle2,subtitle3, price, category, description, imageFileUrl,  }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newSubtitle1, setNewSubTitle1] = useState(subtitle1);
  const [newSubtitle2, setNewSubTitle2] = useState(subtitle2);
  const [newSubtitle3, setNewSubTitle3] = useState(subtitle3);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newCategory, setNewCategory] = useState(category);
  const [imageLink, setImageLink] = useState(imageFileUrl);
  const [showPopup, setShowPopup] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [changeImage, setChangeImage] = useState(false);

  const handleImageFileChange = (e) => {
    setChangeImage(true);
    setImageFile(e.target.files[0]);
  };


  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newImageUrl = imageLink;


    if (changeImage) {
      // Handle image file change
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
        console.log("err", err);
      }
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showPopup && (
        <div className={styles.popupBackground}>
          <div className={styles.popup}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Title"
              />
              <input
                onChange={(e) => setNewSubTitle1(e.target.value)}
                value={newSubtitle1}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Title"
              />
              <input
                onChange={(e) => setNewSubTitle2(e.target.value)}
                value={newSubtitle2}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Title"
              />
              <input
                onChange={(e) => setNewSubTitle3(e.target.value)}
                value={newSubtitle3}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Title"
              />

              <input
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Description"
              />
              <input
                onChange={(e) => setNewCategory(e.target.value)}
                value={newCategory}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Category"
              />
              <input
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Price"
              />
              <input
                type="file"
                accept="image/*"
                className="border border-slate-500 px-8 py-2"
                onChange={handleImageFileChange}
              />
           

              <button className="">Edytuj produkt</button>
              <button onClick={() => setShowPopup(false)}>Zamknij</button>
            </form>
          </div>
        </div>
      )}
      <div>
      <button  onClick={() => setShowPopup(true)} >
        Edytuj produkt
      </button>
      </div>
    </>
  );
}
