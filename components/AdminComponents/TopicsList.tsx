import AddTopic from "./Components/AddTopic";
import { getTopics } from "../../helpers/api/getTopic";
import { getCategories } from "../../helpers/api/getCategory";
import styles from "./TopicList.module.scss";
import TopicCategory from "./Subcomponents/CategoryList";
import TopicList from "./Subcomponents/TopicsList";
import AddCategory from "./Components/AddCategory";

export default async function TopicsList() {
	const { topics } = await getTopics();
	const { categories } = await getCategories();

	return (
		<>
			<div className={`Container ${styles.container}`}>
				<div className={styles.adminBar}>
					<h2>Lista Produktów</h2>
					<AddTopic />
					<AddCategory />
				</div>

				<div className={styles.content}>
					<TopicCategory categories={categories} />
					<TopicList topics={topics} />
				</div>
			</div>
		</>
	);
}
