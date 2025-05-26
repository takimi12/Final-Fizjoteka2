import styles from "./FilmyEbooki.module.scss";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs";
import { getTopics } from "../../../helpers/api/getTopic";
import { getCategories } from "../../../helpers/api/getCategory";
import MainPage from "./components/MainPage";

const FilmyEbooki = async () => {
	const { topics = [] } = await getTopics();
	const { categories = [] } = await getCategories();

	return (
		<>
			<div className={`Container ${styles.Container}`}>
				<Breadcrumbs />
				<MainPage categories={categories} topics={topics} />
			</div>
		</>
	);
};

export default FilmyEbooki;
