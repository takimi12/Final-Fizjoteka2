import EditCategoryForm from "./EditCategoryForm"

const getCategoryById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/category/${id}`, {
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

export default async function EditTopic({ id }) {
  
  const {categories} = await getCategoryById(id)
  
  const { 
    title, 
    subtitle1, 
    subtitle2, 
    subtitle3, 
    price, 
    description, 
    category, 
    imageFileUrl, 
  } = categories;
  return <EditCategoryForm  id={id} title={title} subtitle1={subtitle1} subtitle2={subtitle2} subtitle3={subtitle3}   description={description} price={price} category={category} imageFileUrl={imageFileUrl} />
  
}
