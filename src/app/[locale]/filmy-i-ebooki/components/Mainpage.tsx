'use client'
import { useState } from 'react';
import styles from './Mainpage.module.scss';
import Products from "./Products";
import Categories from "./Category";
import FilterComponent from './subcomponents/Filters';

// Define TypeScript types for categories and topics
interface Category {
    _id: string;
    title: string;
    subtitle1: string;
    subtitle2: string;
    subtitle3: string;
    price: string;
    description: string;
    category: string;
    imageFileUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Topic {
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

interface FilmsAndEbookProps {
    categories: Category[];
    topics: Topic[];
}

export default function FilmsAndEbook({ categories, topics }: FilmsAndEbookProps) {
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories);
    const [filteredTopics, setFilteredTopics] = useState<Topic[]>(topics);

    return (
        <div className={`${styles.mainWrapper} ${styles.localContainer}`}>
            <div className={styles.fitlersGroup}>
                <FilterComponent
                    categories={categories}
                    topics={topics}
                    setFilteredCategories={setFilteredCategories}
                    setFilteredTopics={setFilteredTopics}
                />
            </div>
            <div>
                <Categories filteredCategories={filteredCategories} />
                <Products filteredTopics={filteredTopics} />
            </div>
        </div>
    );
}
