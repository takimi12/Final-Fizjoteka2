import EditTopicForm from "./EditTopicForm";

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

const getTopicById = async (id: string): Promise<{ topic: Topic }> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {

    throw error;
  }
};

export default async function EditTopic({ id }: { id: string }) {
  const { topic } = await getTopicById(id);


  const { title, subtitle, description, price, categories, imageFileUrl, pdfFileUrl } = topic;

  return (
    <EditTopicForm
      id={id}
      title={title}
      subtitle={subtitle}
      description={description}
      price={price}
      category={categories[0]}
      imageFileUrl={imageFileUrl}
      pdfFileUrl={pdfFileUrl}
    />
  );
}