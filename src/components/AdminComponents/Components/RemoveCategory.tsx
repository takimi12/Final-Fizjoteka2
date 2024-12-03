import React from "react";
import Remove from "./RemoveCategoryForm";
import styles from "./RemoveCategory.module.scss";

interface Category {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  categories: string[];
  price: string;
  imageFileUrl: string;
  pdfFileUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/category/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch category");
    }

    return res.json();
  } catch (error) {
    throw error; 
  }
};

interface RemoveTopicProps {
  id: string;
}

export default async function RemoveTopic({ id }: RemoveTopicProps) {
  const category: Category = await getCategoryById(id);

  const { imageFileUrl } = category;

  return (
    <div className={styles.remove}>
      <Remove id={id} imageFileUrl={imageFileUrl} />
    </div>
  );
}