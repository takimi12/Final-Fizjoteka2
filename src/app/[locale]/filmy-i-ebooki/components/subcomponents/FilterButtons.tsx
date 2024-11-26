import styles from "./Filters.module.scss";

interface FilterButtonsProps {
    handleSearchClick: () => void;
    handleClearFilters: () => void;
}

export const  FilterButtons = ({ handleSearchClick, handleClearFilters }: FilterButtonsProps) => {
    return (
        <div className="flex flex-col mt-10">
            <div className='flex'>
                <button className={styles.button} onClick={handleSearchClick}>
                    Wyszukaj
                </button>
            </div>
            <div className='flex justify-center mt-5'>
                <button className={styles.noClass} onClick={handleClearFilters}>
                    Wyczyść filtry
                </button>
            </div>
        </div>
    );
}