import Remove from "./RemoveTopicForm";

interface Topic {
	_id: string;
	title: string;
	subtitle: string;
	description: string;
	categories: string[];
	price: string;
	imageFileUrl: string;
	pdfFileUrl: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

interface RemoveTopicProps {
	id: string;
}

const getTopicById = async (id: string): Promise<Topic> => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/topics/${id}`, {
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch topic");
		}

		return res.json();
	} catch (error) {
		throw new Error("Failed to fetch topic");
	}
};

export default async function RemoveTopic({ id }: RemoveTopicProps) {
	const topic = await getTopicById(id);

	const { imageFileUrl, pdfFileUrl } = topic;

	return <Remove id={id} imageFileUrl={imageFileUrl} pdfFileUrl={pdfFileUrl} />;
}
