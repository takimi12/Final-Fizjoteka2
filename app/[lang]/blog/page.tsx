import { Pagination } from "./components/Paginate";
import styles from "./Blog.module.scss";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs";
import { Blog } from "../../types/Blog/types";



export default async function Page({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;

  const response = await fetch("https://fizjoteka.vercel.app/api/gql/blog");
  const responseEng = await fetch("https://fizjoteka.vercel.app/api/gql/blogEng");

  if (!response.ok) {
    return <div>Error loading blogs</div>;
  }

  const blogs: Blog[] = await response.json();
  const blogs1: Blog[] = await responseEng.json();


  if (!blogs || !blogs1) {
    return <div>Error loading blogs</div>;
  }

  return (
    <>
      <div className={`Container ${styles.containers}`}>
        <Breadcrumbs />
        <div className={styles.parent}>
          <div>
            <h2>{lang === 'pl' ? 'Rozwoj dziecka okiem fizjoterapeuty' : "Child development through physiotherapist's eyes"}</h2>
          </div>
          <div className={` ${styles.container}`}>
            <Pagination blogs={blogs} blogs1={blogs1} currentLang={lang} />
          </div>
        </div>
      </div>
    </>
  );
}