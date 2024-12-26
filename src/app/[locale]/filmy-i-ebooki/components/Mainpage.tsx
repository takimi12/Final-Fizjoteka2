'use client'
import { useState } from 'react';
import styles from './Mainpage.module.scss';
import Products from "./Products";
import Categories from "./Category";
import FilterComponent from './subcomponents/Filters';
import { ICategory } from '../../../../../backend/models/category';
import { ITopic } from '../../../../../backend/models/topics';

interface FilmsAndEbookProps {
    categories: ICategory[];
    topics: ITopic[];
}

export default function FilmsAndEbook({ categories, topics }: FilmsAndEbookProps) {
    const [filteredCategories, setFilteredCategories] = useState<ICategory[]>(categories);
    const [filteredTopics, setFilteredTopics] = useState<ITopic[]>(topics);

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
