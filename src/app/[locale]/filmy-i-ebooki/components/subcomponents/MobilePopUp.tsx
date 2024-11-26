import styles from "./Filters.module.scss";
import {CategoryFilter} from './CategoryFilter';
import {FilterButtons} from './FilterButtons';

interface MobilePopupProps {
    isPopupOpen: boolean;
    handlePopupClose: () => void;
    uniqueCategories: string[];
    selectedCategories: string[];
    handleCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearchClick: () => void;
    handleClearFilters: () => void;
}

export const MobilePopup =({
    isPopupOpen,
    handlePopupClose,
    uniqueCategories,
    selectedCategories,
    handleCategoryChange,
    handleSearchClick,
    handleClearFilters
}: MobilePopupProps) => {
    return (
        <>
            <button className={styles.button} onClick={handlePopupClose}>
                Sprecyzuj czego szukasz
            </button>
            {isPopupOpen && (
                <div className={styles.overlay} onClick={handlePopupClose}>
                    <div className={styles.popup}>
                        <div className={styles.topText}>
                            <h6>Sprecyzuj czego szukasz</h6>
                            <button className={styles.closeButton} onClick={handlePopupClose}>x</button>
                        </div>
                        <CategoryFilter
                            uniqueCategories={uniqueCategories}
                            selectedCategories={selectedCategories}
                            handleCategoryChange={handleCategoryChange}
                        />
                        <FilterButtons
                            handleSearchClick={handleSearchClick}
                            handleClearFilters={handleClearFilters}
                        />
                    </div>
                </div>
            )}
        </>
    );
}