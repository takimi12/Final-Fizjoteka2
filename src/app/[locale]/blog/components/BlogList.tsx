import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogList.module.scss';
import Etiquette from "../../../../../public/assets/Blog/etiquette.svg";
import Calendar from "../../../../../public/assets/Blog/calendar.svg";
import Arrow from "../../../../../public/assets/Blog/arrow.svg";

interface Blog {
  id: string;
  publishedAt: string;
  tytul: string;
  slugs: string[];
  richText: {
    raw: string | Record<string, any>;
  };
}

interface BlogListProps {
  blogs: Blog[];
}

const getFirstImageSrc = (rawContent: any): string | undefined => {
  if (rawContent && rawContent.children) {
    for (const child of rawContent.children) {
      if (child.type === 'image' && child.src) {
        return child.src;
      }
    }
  }
  return undefined;
};

export const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className={styles.containers}>
      {blogs.map((blog, index) => {
        const publishedDate = new Date(blog.publishedAt);
        const formattedDate = publishedDate.toLocaleDateString();

        return (
          <section className={styles.singleElement} key={index}>
            <div>
              {getFirstImageSrc(blog.richText.raw) ? (
                <Link href={`/pl/blog/${blog.id}`}>
                <Image
                  src={getFirstImageSrc(blog.richText.raw)!}
                  alt="Blog Image"
                  style={{
                    width: '100%',
                    height: '330px',
                    objectFit: 'cover',
                  }}
                  width={500}
                  height={300}
                />
                             </Link>

              ) : null}
             </div>
            <div className={styles.content}>
              <Link className={styles.anchor} href={`/pl/blog/${blog.id}`}>
                <h5>{blog.tytul}</h5>
              </Link>
              <div className={styles.etiquette}>
                <Image
                  src={Etiquette}
                  width={15}
                  height={15}
                  alt="etiquette"
                />
                <p>{blog.slugs}</p>
              </div>
              <div className={styles.calendar}>
                <Image
                  src={Calendar}
                  width={15}
                  height={15}
                  alt="Calendar"
                />
                <p>{formattedDate}</p>
              </div>
              <div className={styles.readMe}>
                <Link href={`/pl/blog/${blog.id}`} className={styles.readmeAnchor}>
                  Czytam
                </Link>
                <Image src={Arrow} width={15} height={15} alt="Arrow" />
              </div>
            </div>
          </section>
        );
      })}
      
    </div>
  );
};

