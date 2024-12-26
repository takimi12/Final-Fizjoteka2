import {Pagination} from './components/Paginate'; 
import styles from './blog.module.scss';
import { fetchData } from '@/app/api/gql/blog/route';




export default async function Page() {
  const blogs = await fetchData();



  if (!blogs) {
    return <div>Error loading blogs</div>;
  }

  return (
    <div className={styles.parent}>
      <div className={`Container ${styles.containers}`}>
        <h2>Rozwoj dziecka okiem fizjoterapeuty</h2>
      </div>
      <div className={`Container ${styles.container}`}>
      <Pagination blogs={blogs} />
      </div>
    </div>
  );
}
