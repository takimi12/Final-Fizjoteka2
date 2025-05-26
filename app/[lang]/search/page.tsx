import { fetchData } from "../../api/gql/blog/blogService";
import { Blogsearch } from "../../types/Blog/types";
import BlogSearch from "./components/BlogSearch";

const BlogSearchPage = async () => {
  const blogs = (await fetchData()) as Blogsearch[] | null;

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