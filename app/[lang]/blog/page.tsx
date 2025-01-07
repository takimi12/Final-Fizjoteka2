import { Pagination } from "./components/Paginate";
import styles from "./Blog.module.scss";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs";

interface Blog {
  author: string;
  id: string;
  publishedAt: string;
  tytul: string;
  slugs: string[];
  richText: {
    raw: string | Record<string, string>;
  };
}

export default async function Page() {
  const response = await fetch("https://fizjoteka.vercel.app/api/gql/blog");

  if (!response.ok) {
    return <div>Error loading blogs</div>;
  }

  const blogs: Blog[] = await response.json();

  if (!blogs) {
    return <div>Error loading blogs</div>;
  }

  return (
    <>
      <div className={`Container ${styles.containers}`}>
        <Breadcrumbs />
        <div className={styles.parent}>
          <div>
            <h2>Rozwoj dziecka okiem fizjoterapeuty</h2>
          </div>
          <div className={` ${styles.container}`}>
            <Pagination blogs={blogs} />
          </div>
        </div>
      </div>
    </>
  );
}