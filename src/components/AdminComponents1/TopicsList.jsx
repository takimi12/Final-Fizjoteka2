import AddTopic from "./AddTopic";
import { getTopics } from "../../../helpers/api/getTopic";
import {getCategory} from "../../../helpers/api/getCategory"
import styles from "./TopicList.module.scss";
import TopicCategory from "./components/categoryList"
import TopicList from "./components/topicsList"
import AddCategory from "./AddCategory"
import AddCode from "./AddingCodes"




export default async function TopicsList() {
  const  {topics}  = await getTopics();
  const {categories} = await getCategory();

console.log(topics, 'topics')

  return (

 <>
    <div className={`Container m-auto ${styles.adminBar}`}>
      <div>
        <h2>Lista Produktów</h2>
      </div>
      <AddCode />

      <AddTopic />
      <AddCategory />
    </div>
    <div className="Container  mx-auto py-8">

<TopicCategory categories={categories} />       
<TopicList topics={topics}/>

    </div>
    </>
  );
}
