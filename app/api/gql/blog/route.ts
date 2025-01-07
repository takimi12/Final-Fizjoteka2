// import { GraphQLClient } from "graphql-request";

// interface RichText {
// 	raw: string | Record<string, string>;
// }

// interface Blog {
// 	id: string;
// 	publishedAt: string;
// 	tytul: string;
// 	slugs: string[];
// 	richText: RichText;
// }

// interface FetchDataResponse {
// 	blog1S: Blog[];
// }

// export const fetchData = async (): Promise<Blog[] | null> => {
// 	const endpoint = process.env.Blog_endpoint;
// 	const graphQLClient = new GraphQLClient(endpoint!);

// 	const query = `
//     query MyQuery {
//       blog1S {
//         author
//         id
//         publishedAt
//         tytul
//         slugs
//         richText {
//           raw
//         }
//       }
//     }
//   `;

// 	try {
// 		const data: FetchDataResponse = await graphQLClient.request(query);
// 		return data.blog1S;
// 	} catch (error) {
// 		return null;
// 	}
// };

// import { GraphQLClient } from "graphql-request";
// import { NextResponse } from 'next/server';

// interface RichText {
// 	raw: string | Record<string, string>;
// }

// interface Blog {
// 	id: string;
// 	publishedAt: string;
// 	tytul: string;
// 	slugs: string[];
// 	richText: RichText;
// }

// interface FetchDataResponse {
// 	blog1S: Blog[];
// }

// export const GET = async (): Promise<NextResponse> => {
// 	const endpoint = process.env.Blog_endpoint;
// 	const graphQLClient = new GraphQLClient(endpoint!);

// 	const query = `
//     query MyQuery {
//       blog1S {
//         author
//         id
//         publishedAt
//         tytul
//         slugs
//         richText {
//           raw
//         }
//       }
//     }
//   `;

// 	try {
// 		const data: FetchDataResponse = await graphQLClient.request(query);
// 		return NextResponse.json(data.blog1S);
// 	} catch (error) {
// 		return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
// 	}
// };


import { NextResponse } from "next/server";
import { fetchData } from "./blogService";

export const GET = async (): Promise<NextResponse> => {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
};