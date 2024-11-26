import Remove from "./RemoveCategoryForm";
import styles from "./RemoveCategory.module.scss"

const getCategoryById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/category/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch category");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function RemoveTopic({ id }) {
  const {categories} = await getCategoryById(id);

  const {  imageFileUrl  } = categories;


  return (
    <>
    <div className={styles.remove}>
      <Remove
        id={id}
        imageFileUrl={imageFileUrl}
      />
      </div>
    </>
  );
}
