"use client";
import React, { useState } from "react";
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

	const allCategories = Array.from(
		new Set([
			...categories.map((cat) => cat.category),
			...topics.flatMap((product) => product.categories),
		]),
	);

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
					<Categories categories={filteredCategories} />
					<Topics topics={filteredTopics} />
				</div>
			</div>
		</div>
	);
};

export default MainPage;
