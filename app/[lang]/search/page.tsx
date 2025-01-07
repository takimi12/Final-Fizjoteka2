import { fetchData } from "../../api/gql/blog/blogService";
import BlogSearch from "./components/BlogSearch";

interface Blog {
  author: string;
  id: string;
  publishedAt: string;
  tytul: string;
  slugs: string;
  richText: {
    raw: object;
  };
}

const BlogSearchPage = async () => {
  const blogs = (await fetchData()) as Blog[] | null;

  if (!blogs) {
    return (
      <div className="container">
        <p>Ładowanie...</p>
      </div>
    );
  }

  return <BlogSearch blogs={blogs} />;
};

export default BlogSearchPage;