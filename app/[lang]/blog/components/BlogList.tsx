import Image from "next/image";
import Link from "next/link";
import styles from "./BlogList.module.scss";
import Etiquette from "../../../../public/assets/Blog/etiquette.svg";
import Calendar from "../../../../public/assets/Blog/calendar.svg";
import Arrow from "../../../../public/assets/Blog/arrow.svg";
import { BlogListProps, RichTextContent } from "../../../types/Blog/types";



const getFirstImageSrc = (rawContent: string | Record<string, unknown>): string | undefined => {
  const content = typeof rawContent === 'string' ? JSON.parse(rawContent) as RichTextContent : rawContent as RichTextContent;

  if (content && content.children) {
    for (const child of content.children) {
      if (child.type === "image" && child.src) {
        return child.src;
      }
    }
  }
  return undefined;
};

export const BlogList = ({ blogs, currentLang }: BlogListProps) => {
  return (
    <div className={styles.containers}>
      {blogs.map((blog, index) => {
        const publishedDate = new Date(blog.publishedAt);
        const formattedDate = publishedDate.toLocaleDateString();
        const langPrefix = currentLang === 'en' ? `/${currentLang}` : '';

        return (
          <section className={styles.singleElement} key={index}>
            <div>
              {getFirstImageSrc(blog.richText.raw) ? (
                <Link href={`${langPrefix}/blog/${blog.id}`}>
                  <Image
                    src={getFirstImageSrc(blog.richText.raw)!}
                    alt="Blog Image"
                    style={{
                      width: "100%",
                      height: "330px",
                      objectFit: "cover",
                    }}
                    width={500}
                    height={300}
                  />
                </Link>
              ) : null}
            </div>
            <div className={styles.content}>
              <Link className={styles.anchor} href={`${langPrefix}/blog/${blog.id}`}>
                <h5>{blog.tytul}</h5>
              </Link>
              <div className={styles.etiquette}>
                <Image src={Etiquette} width={15} height={15} alt="etiquette" />
                <p>{blog.slugs}</p>
              </div>
              <div className={styles.calendar}>
                <Image src={Calendar} width={15} height={15} alt="Calendar" />
                <p>{formattedDate}</p>
              </div>
              <div className={styles.readMe}>
                <Link href={`${langPrefix}/blog/${blog.id}`} className={styles.readmeAnchor}>
                  {currentLang === 'pl' ? 'Czytam' : 'Read more'}
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
