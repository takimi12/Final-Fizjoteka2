
import styles from "./FilmyEbooki.module.scss";
import Products from "./components/Products";
import Categories from "./components/Category";
import FilterComponent from "./components/subcomponents/Filters";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs";
import { getTopics } from "../../../helpers/api/getTopic";
import { getCategory } from "../../../helpers/api/getCategory";

const MainPage = async () => {
	const { topics } = await getTopics();
	const { categories } = await getCategory();

	return (
		<>
			<div className={`Container ${styles.Container}`}>
				<Breadcrumbs />
				<div className={`${styles.mainWrapper} ${styles.localContainer}`}>
					<div className={styles.fitlersGroup}>
						<FilterComponent categories={categories} topics={topics} />
					</div>
					<div>
						<Categories categories={categories} />
						<Products topics={topics} />

					</div>
				</div>
			</div>
		</>
	);
};

export default MainPage;
