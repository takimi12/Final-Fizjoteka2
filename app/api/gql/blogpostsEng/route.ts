
import { NextResponse } from 'next/server';

const endpoint = process.env.Blog_endpoint;

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	if (!id) {
		return NextResponse.json({ error: 'Missing "id" parameter' }, { status: 400 });
	}

	try {
		const res = await fetch(
			`${endpoint}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `
						query MyQuery($id: ID!) {
							blog2(where: { id: $id }) {
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

		return NextResponse.json(data.data.blog2);
	} catch (error) {
		return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
	}
};