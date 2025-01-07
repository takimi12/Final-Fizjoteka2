import styles from "./Filters.module.scss";

interface CategoryFilterProps {
	uniqueCategories: string[];
	selectedCategories: string[];
	handleCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CategoryFilter = ({
	uniqueCategories,
	selectedCategories,
	handleCategoryChange,
}: CategoryFilterProps) => {
	return (
		<>
			<div className={styles.category}>
				<h6 className={styles.title}>Kategoria</h6>
			</div>
			{uniqueCategories.map((category) => (
				<div key={category} className={styles.category}>
					<fieldset>
						<label className="Input_checkbox__ZAWb5">
							<input
								type="checkbox"
								className={styles.input}
								name={category}
								id={category}
								value={category}
								checked={selectedCategories.includes(category)}
								onChange={handleCategoryChange}
							/>
							<span>{category}</span>
						</label>
					</fieldset>
				</div>
			))}
		</>
	);
};
