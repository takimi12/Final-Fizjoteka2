'use client';
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation"; // Poprawny import
import { useState } from "react";

export default function RemoveBtn({ id, imageFileUrl }) {
  const [imageLink, setImageLink] = useState(imageFileUrl);

  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć?");

    if (confirmed) {
      try {
        // Usunięcie tematu
        const res = await fetch(`http://localhost:3000/api/category?id=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Nie udało się usunąć tematu");
        }

       
          const imageName = imageFileUrl.split("/").pop();

          try {
            await fetch(`http://localhost:3000/api/deleteAmazonObj`, {
              method: "DELETE",
              body: JSON.stringify({ fileName: imageName }),
            });

   
          } catch (err) {
            console.log("Błąd obsługi obrazka:", err);
          }
      
        router.refresh();
      } catch (error) {
        console.error("Błąd podczas usuwania tematu:", error);
      }
    }
  };

  return (
    <div>
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />

    </button>
    </div>
  );
}
