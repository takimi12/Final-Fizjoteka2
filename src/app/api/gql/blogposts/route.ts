// data.ts
export const fetchBlogData = async (id: string) => {
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
      }
    );
  
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
  
    const data = await res.json();
    if (data.errors) {
      throw new Error(`GraphQL Error: ${data.errors[0].message}`);
    }
  
    return data.data.blog1;
  };
  