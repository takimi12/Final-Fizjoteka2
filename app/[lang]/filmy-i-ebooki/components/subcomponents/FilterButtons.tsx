import styles from "./Filters.module.scss";

interface FilterButtonsProps {
	handleSearchClick: () => void;
	handleClearFilters: () => void;
}

export const FilterButtons = ({ handleSearchClick, handleClearFilters }: FilterButtonsProps) => {
	return (
		<div className="mt-10 flex flex-col">
			<div className="flex">
				<button className={styles.button} onClick={handleSearchClick}>
					Wyszukaj
				</button>
			</div>
			<div className="mt-5 flex justify-center">
				<button className={styles.noClass} onClick={handleClearFilters}>
					Wyczyść filtry
				</button>
			</div>
		</div>
	);
};
