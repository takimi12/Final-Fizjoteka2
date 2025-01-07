"use client";

import { useState, useEffect } from "react";
import styles from "./Filters.module.scss";
import { CategoryFilter } from "./CategoryFilter";
import { FilterButtons } from "./FilterButtons";
import { MobilePopup } from "./MobilePopUp";
import { ICategory } from "../../../../../backend/models/category"
import { IProduct } from "../../../../../backend/models/product"; 

interface FilterComponentProps {
  categories: ICategory[];
  topics: IProduct[];
}

export default function Filters({
  categories,
  topics,
}: FilterComponentProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>(categories);
  const [filteredTopics, setFilteredTopics] = useState<IProduct[]>(topics);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
    }
  };

  const applyFilters = () => {
    const newFilteredCategories = selectedCategories.length
      ? categories.filter((category) => selectedCategories.includes(category.category))
      : categories;
    const newFilteredTopics = selectedCategories.length
      ? topics.filter((product) => product.categories.some((cat) => selectedCategories.includes(cat)))
      : topics;

    setFilteredCategories(newFilteredCategories);
    setFilteredTopics(newFilteredTopics);
    setIsPopupOpen(false);
  };

  const handleSearchClick = () => {
    applyFilters();
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setFilteredCategories(categories);
    setFilteredTopics(topics);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const uniqueCategories = Array.from(
    new Set([
      ...categories.map((category) => category.category),
      ...topics.flatMap((topic) => topic.categories),
    ])
  );

  return (
    <div className={styles.filters}>
      {isMobile ? (
        <MobilePopup
          isPopupOpen={isPopupOpen}
          handlePopupClose={handlePopupClose}
          uniqueCategories={uniqueCategories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          handleSearchClick={handleSearchClick}
          handleClearFilters={handleClearFilters}
        />
      ) : (
        <>
          <CategoryFilter
            uniqueCategories={uniqueCategories}
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
          />
          <FilterButtons
            handleSearchClick={handleSearchClick}
            handleClearFilters={handleClearFilters}
          />
        </>
      )}
    </div>
  );
}
