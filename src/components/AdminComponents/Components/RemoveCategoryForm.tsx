'use client';
import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import styles from "./RemoveCategoryForm.module.scss"

interface RemoveBtnProps {
  id: string;
  imageFileUrl: string;
}

export default function RemoveBtn({ id, imageFileUrl }: RemoveBtnProps) {
  const [imageLink, setImageLink] = useState<string>(imageFileUrl);
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć?");

    if (confirmed) {
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