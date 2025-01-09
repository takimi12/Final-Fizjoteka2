import { GraphQLClient } from "graphql-request";

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

interface FetchDataResponse {
  blog1S: Blog[];
}

export async function fetchData(): Promise<Blog[] | null> {
  const endpoint = process.env.Blog_endpoint;
  const graphQLClient = new GraphQLClient(endpoint!);

  const query = `
    query MyQuery {
      blog1S {
        author
        id
        publishedAt
        tytul
        slugs
        richText {
          raw
        }
      }
    }
  `;

  try {
    const data: FetchDataResponse = await graphQLClient.request(query);
    return data.blog1S;
  } catch (error) {
    return null;
  }
}