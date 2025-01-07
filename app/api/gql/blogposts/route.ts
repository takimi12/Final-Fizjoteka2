// // data.ts
// export const fetchBlogData = async (id: string) => {
// 	const res = await fetch(
// 		"https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clur45o3j00je07wbn2j8pg2k/master",
// 		{
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				query: `
//             query MyQuery($id: ID!) {
//               blog1(where: { id: $id }) {
//                 createdAt
//                 author
//                 tytul
//                 slugs
//                 richText {
//                   html
//                 }
//               }
//             }
//           `,
// 				variables: {
// 					id,
// 				},
// 			}),
// 		},
// 	);

// 	if (!res.ok) {
// 		throw new Error(`Failed to fetch data: ${res.statusText}`);
// 	}

// 	const data = await res.json();
// 	if (data.errors) {
// 		throw new Error(`GraphQL Error: ${data.errors[0].message}`);
// 	}

// 	return data.data.blog1;
// };
// app/api/gql/blogposts/route.ts

// import { NextResponse } from 'next/server';

// export const GET = async (request: Request) => {
// 	// Pobierz parametr `id` z URL (np. /api/gql/blogposts?id=123)
// 	const { searchParams } = new URL(request.url);
// 	const id = searchParams.get('id');

// 	if (!id) {
// 		return NextResponse.json({ error: 'Missing "id" parameter' }, { status: 400 });
// 	}

// 	try {
// 		const res = await fetch(
// 			'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clur45o3j00je07wbn2j8pg2k/master',
// 			{
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					query: `
// 						query MyQuery($id: ID!) {
// 							blog1(where: { id: $id }) {
// 								createdAt
// 								author
// 								tytul
// 								slugs
// 								richText {
// 									html
// 								}
// 							}
// 						}
// 					`,
// 					variables: {
// 						id,
// 					},
// 				}),
// 			},
// 		);

// 		if (!res.ok) {
// 			throw new Error(`Failed to fetch data: ${res.statusText}`);
// 		}

// 		const data = await res.json();

// 		if (data.errors) {
// 			throw new Error(`GraphQL Error: ${data.errors[0].message}`);
// 		}

// 		// Zwróć dane jako odpowiedź JSON
// 		return NextResponse.json(data.data.blog1);
// 	} catch (error) {
// 		// Obsłuż błędy
// 		return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
// 	}
// };

import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	if (!id) {
		return NextResponse.json({ error: 'Missing "id" parameter' }, { status: 400 });
	}

	try {
		const res = await fetch(
			'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clur45o3j00je07wbn2j8pg2k/master',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `
						query MyQuery($id: ID!) {
							blog1(where: { id: $id }) {
								createdAt
								author
								tytul
								slugs
								richText {
									html
								}
							}
						}
					`,
					variables: {
						id,
					},
				}),
			},
		);

		if (!res.ok) {
			throw new Error(`Failed to fetch data: ${res.statusText}`);
		}

		const data = await res.json();

		if (data.errors) {
			throw new Error(`GraphQL Error: ${data.errors[0].message}`);
		}

		return NextResponse.json(data.data.blog1);
	} catch (error) {
		return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
	}
};