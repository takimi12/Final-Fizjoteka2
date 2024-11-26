'use client';
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation"; // Poprawny import
import { useState } from "react";

export default function RemoveBtn({ id, imageFileUrl, pdfFileUrl }) {
  const [imageLink, setImageLink] = useState(imageFileUrl);
  const [pdfLink, setPdfLink] = useState(pdfFileUrl);



  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = window.confirm("Czy na pewno chcesz usunąć?");

    if (confirmed) {
      try {
        // Usunięcie tematu
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Nie udało się usunąć tematu");
        }

        // Usunięcie obrazka
        const imageName = imageFileUrl.split("/").pop();

        try {
          await fetch(`http://localhost:3000/api/deleteAmazonObj`, {
            method: "DELETE",
            body: JSON.stringify({ fileName: imageName }),
          });

          // Obsługa przesyłania nowego obrazka (jeśli potrzebne)
          const formData = new FormData();
          formData.append("file", imageFileUrl);

          const uploadRes = await fetch(`http://localhost:3000/api/addAmazonObj`, {
            method: "POST",
            body: formData,
          });

          const newFileUrl = await uploadRes.json();
          const newImageUrl = newFileUrl.fileUrl;
          setImageLink(newImageUrl); // Aktualizacja stanu imageLink, jeśli jest potrzebna
        } catch (err) {
          console.log("Błąd obsługi obrazka:", err);
        }

        // Usunięcie pliku PDF
        const pdfName = pdfFileUrl.split("/").pop();

        try {
          await fetch(`http://localhost:3000/api/deleteAmazonObj`, {
            method: "DELETE",
            body: JSON.stringify({ fileName: pdfName }),
          });

          // Obsługa przesyłania nowego pliku PDF (jeśli potrzebne)
          // Zakładając podobny kod jak dla przesyłania obrazka powyżej
        } catch (err) {
          console.log("Błąd obsługi PDF:", err);
        }

        // Odświeżenie strony po pomyślnym usunięciu
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
