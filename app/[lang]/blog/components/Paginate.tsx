"use client";
import { useState } from "react";
import { BlogList } from "./BlogList";
import styles from "./Paginate.module.scss";

interface Blog {
  id: string;
  publishedAt: string;
  tytul: string;
  slugs: string[];
  richText: {
    raw: string | Record<string, string>;
  };
}

interface PaginationProps {
  blogs: Blog[];
  blogs1: Blog[];
  currentLang: string;
}

export const Pagination = ({ blogs, blogs1, currentLang }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const currentBlogs = currentLang === 'pl' ? blogs : blogs1;
  
  const totalPages = Math.ceil(currentBlogs.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = currentBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      <BlogList blogs={currentPosts} currentLang={currentLang} />

      <div className={styles.paginationControls}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          {currentLang === 'pl' ? 'Poprzednia strona' : 'Previous page'}
        </button>
        <span>
          {currentLang === 'pl' 
            ? `strona ${currentPage} z ${totalPages}` 
            : `page ${currentPage} of ${totalPages}`}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          {currentLang === 'pl' ? 'Następna strona' : 'Next page'}
        </button>
      </div>
    </div>
  );
};