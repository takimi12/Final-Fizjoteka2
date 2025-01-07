import EditCategoryForm from "./EditCategoryForm";

interface Category {
	title: string;
	subtitle1: string;
	subtitle2: string;
	subtitle3: string;
	price: number;
	description: string;
	category: string;
	imageFileUrl: string;
}

interface CategoryResponse {
	categories: Category;
}

const getCategoryById = async (id: string): Promise<CategoryResponse> => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/category/${id}`, {
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch category");
		}

		return res.json();
	} catch (error) {
		throw error;
	}
};

export default async function EditTopic({ id }: { id: string }) {
	try {
		const { categories } = await getCategoryById(id);

		const { title, subtitle1, subtitle2, subtitle3, price, description, category, imageFileUrl } =
			categories;

		return (
			<EditCategoryForm
				id={id}
				title={title}
				subtitle1={subtitle1}
				subtitle2={subtitle2}
				subtitle3={subtitle3}
				description={description}
				price={price}
				category={category}
				imageFileUrl={imageFileUrl}
			/>
		);
	} catch (error) {
		return <div>Error loading category data</div>;
	}
}
