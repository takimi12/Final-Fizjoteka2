'use client'
import { useState } from 'react';
import {BlogList} from './BlogList'; 
import styles from './Paginate.module.scss';

interface Blog {
  id: string;
  publishedAt: string;
  tytul: string;
  slugs: string[];
  richText: {
    raw: string | Record<string, any>;
  };
}


interface PaginationProps {
  blogs: Blog[];
}

export const Pagination = ({ blogs }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

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
      <BlogList blogs={currentPosts} /> 

      <div className={styles.paginationControls}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Poprzednia strona
        </button>
        <span>strona {`${currentPage} z ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
      Następna strona
        </button>
      </div>
    </div>
  );
};
