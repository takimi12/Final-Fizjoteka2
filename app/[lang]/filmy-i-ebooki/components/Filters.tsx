'use client';
import React, { useState, useEffect } from "react";
import styles from "./Filters.module.scss";

interface FilterProps {
  allCategories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  onSearch: () => void;
}

const Filter: React.FC<FilterProps> = ({ allCategories, selectedCategories, setSelectedCategories, onSearch }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div>
      {isMobile ? (
        <div className={styles.rwdWrapper}>
          <button className={styles.filtersButton} onClick={() => setShowPopup(true)}>
            Sprecyzuj czego szukasz
          </button>
          <div className={styles.listingHeading}>
              <h2>Znajdź produkt odpowiedni dla Ciebie</h2>
              <p>Uzyskując nieograniczony dostęp do filmów, masz szansę nadrobić webinary w wygodnym dla siebie momencie.</p>
          </div>
        </div>
      ) : (
        <div className={styles.filters}>
          <div className={styles.category}>
            <h6>Kategoria</h6>
          </div>
          {allCategories.map((categoryName) => (
            <div key={categoryName} className={styles.category}>
              <fieldset>
                <label>
                  <input
                    type="checkbox"
                    className={styles.input}
                    id={categoryName}
                    checked={selectedCategories.includes(categoryName)}
                    onChange={() => handleCategoryChange(categoryName)}
                  />
                  <span>{categoryName}</span>
                </label>
              </fieldset>
            </div>
          ))}
          <div className={styles.buttons}>
            <button className={styles.button1} onClick={onSearch}>Wyszukaj</button>
          </div>
          <div className={styles.buttons}>
            <button className={styles.button2} onClick={() => { setSelectedCategories([]); onSearch(); }}>Wyczyść filtry</button>
          </div>
        </div>
      )}
      {showPopup && (
        <div className={styles.popup}>
        <div 
        className={styles.overlay}
        onClick={() => setShowPopup(false)}
        ></div>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={() => setShowPopup(false)}>×</button>
            <div className={styles.filters}>
              <div className={styles.category}>
                <h6>Kategoria</h6>
              </div>
              {allCategories.map((categoryName) => (
                <div key={categoryName} className={styles.category}>
                  <fieldset>
                    <label>
                      <input
                        type="checkbox"
                        className={styles.input}
                        id={categoryName}
                        checked={selectedCategories.includes(categoryName)}
                        onChange={() => handleCategoryChange(categoryName)}
                      />
                      <span>{categoryName}</span>
                    </label>
                  </fieldset>
                </div>
              ))}
              <div className={styles.buttons}>
                <button className={styles.button1} onClick={() => { setShowPopup(false); onSearch(); }}>Wyszukaj</button>
              </div>
              <div className={styles.buttons}>
                <button className={styles.button2} onClick={() => { setSelectedCategories([]); onSearch(); }}>Wyczyść filtry</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
