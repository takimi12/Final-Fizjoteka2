"use client";

import React, { useState } from "react";
import styles from "./BlogSearch.module.scss";
import Link from "next/link";

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

interface BlogSearchProps {
	blogs: Blog[];
}

const BlogSearch: React.FC<BlogSearchProps> = ({ blogs }) => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

	const handleSearch = (query: string): void => {
		setSearchQuery(query);

		if (query.length < 3) {
			setFilteredBlogs([]);
			return;
		}

		const searchWords = query.toLowerCase().split(" ");

		const filtered = blogs.filter((blog) => {
			const titleWords = blog.tytul.toLowerCase();
			const slugWords = blog.slugs.toLowerCase();
			const searchContent = `${titleWords} ${slugWords}`;

			return searchWords.every((word) => searchContent.includes(word));
		});

		setFilteredBlogs(filtered);
	};

	return (
		<div className={`Container ${styles.container}`}>
			<div className={styles.searchField}>
				<fieldset>
					<label htmlFor="search" className={styles.searchLabel}>
						Wpisz szukaną frazę (minimum 3 znaki)
						<input
							type="text"
							name="search"
							id="search"
							className={styles.searchInput}
							placeholder="np. noszenie dziecka"
							value={searchQuery}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								handleSearch(e.target.value);
							}}
						/>
					</label>
				</fieldset>
			</div>

			{searchQuery.length >= 3 && (
				<article className={styles.results}>
					<h5 className={styles.resultsTitle}>Zobacz co udało nam się znaleźć:</h5>

					{filteredBlogs.length > 0 ? (
						<div className={styles.results}>
							{filteredBlogs.map((blog) => (
								<div key={blog.id} className={styles.blogCard}>
									<Link href={`/pl/blog/${blog.id}`} className={styles.anchor}>
										{blog.tytul}
									</Link>

									<p className={styles.blogDate}>
										{new Date(blog.publishedAt).toLocaleDateString("pl-PL")}
									</p>
									<div className={styles.blogTags}>
										<p>Tagi: {blog.slugs}</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<p>Nie znaleziono pasujących wpisów.</p>
					)}
				</article>
			)}
		</div>
	);
};

export default BlogSearch;
