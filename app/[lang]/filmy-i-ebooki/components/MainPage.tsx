"use client";

import React, { useState, useEffect } from "react";
import Topics from "./Products";
import Categories from "./Category";
import Filter from "./Filters";
import { ICategory } from "../../../../backend/models/category";
import { IProduct } from "../../../../backend/models/product";
import styles from "./MainPage.module.scss";

interface MainPageProps {
  topics: IProduct[];
  categories: ICategory[];
}

const MainPage: React.FC<MainPageProps> = ({ topics, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<IProduct[]>(topics);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>(categories);
  const [isEnglish, setIsEnglish] = useState(false);

  const allCategories = Array.from(
    new Set([
      ...categories.map((cat) => cat.category),
      ...topics.flatMap((product) => product.categories),
    ]),
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsEnglish(window.location.pathname.startsWith("/en"));
    }
  }, []);

  const handleFilter = () => {
    const filteredCats = selectedCategories.length
      ? categories.filter((cat) => selectedCategories.includes(cat.category))
      : categories;

    const filteredProds = selectedCategories.length
      ? topics.filter((product) =>
          product.categories.some((category) => selectedCategories.includes(category)),
        )
      : topics;

    setFilteredCategories(filteredCats);
    setFilteredTopics(filteredProds);
  };

  return (
    <div className={`Container ${styles.Container}`}>
      <div className={`${styles.mainWrapper} ${styles.localContainer}`}>
        <div className={styles.fitlersGroup}>
          <Filter
            allCategories={allCategories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            onSearch={handleFilter}
          />
        </div>
		<div>
  <div className={styles.titleText}>
    {isEnglish ? (
      <>
        <h2>Find the product that suits you</h2>
        <p>
          By gaining unlimited access to videos, you have the opportunity to catch up on webinars at your convenience.
        </p>
      </>
    ) : (
      <>
        <h2>Znajdź produkt odpowiedni dla Ciebie</h2>
        <p>
          Uzyskując nieograniczony dostęp do filmów, masz szansę nadrobić
          webinary w wygodnym dla siebie momencie.
        </p>
      </>
    )}
  </div>

          {isEnglish ? (
            <div className={styles.titleTextEnglish}>
              <h2 className={styles.English}>Oy, it seems that we do not have such products</h2>
              <p>
                Unfortunately, we do not have any products that meet your criteria.
                We recommend clearing your filters to expand your search.
              </p>
            </div>
          ) : (
            <>
              <Categories categories={filteredCategories} />
              <Topics topics={filteredTopics} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
