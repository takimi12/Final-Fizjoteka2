import Remove from "./RemoveTopicForm"

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function RemoveTopic({ id }) {
  const { topic } = await getTopicById(id);



  const { title, description, price, category, imageFileUrl,pdfFileUrl } = topic;

  return <Remove id={id} title={title} description={description} price={price} category={category} imageFileUrl={imageFileUrl} pdfFileUrl={pdfFileUrl}/>;
}
