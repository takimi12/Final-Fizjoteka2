export interface Blog {
    id: string;
    publishedAt: string;
    tytul: string;
    slugs: string[];
    richText: {
      raw: string | Record<string, string>;
    };
  }
  
 export interface PaginationProps {
    blogs: Blog[];
    blogs1: Blog[];
    currentLang: string;
  }
  
export  interface BlogListProps {
    blogs: Blog[];
    currentLang: string;
  }
  
  export interface RichTextChild {
    type: string;
    src?: string;
    children?: RichTextChild[];
  }
  
  export interface RichTextContent {
    children?: RichTextChild[];
  }

export  interface BlogIdPage {
  id: string;
  createdAt: string;
  author: string;
  tytul: string;
  slugs: string[];
  richText: {
    html: string;
  };
}


 export interface BlogId {
  id: string;
}

export interface Blogsearch {
	author: string;
	id: string;
	publishedAt: string;
	tytul: string;
	slugs: string;
	richText: {
		raw: object;
	};
}

export interface BlogSearchProps {
	blogs: Blogsearch[];
}