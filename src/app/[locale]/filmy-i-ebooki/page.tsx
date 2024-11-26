
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";
import { getTopics } from "../../../../helpers/api/getTopic";
import { getCategory } from "../../../../helpers/api/getCategory";
import Mainpage from "./components/Mainpage"

export default async function FilmsAndEbook() {
  const { topics } = await getTopics();
  const { categories } = await getCategory();


    return (
      <>
        <Breadcrumbs />
		<Mainpage topics={topics} categories={categories} />
       
      </>
    );
  };