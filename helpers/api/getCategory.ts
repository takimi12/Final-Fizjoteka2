import { ICategory } from "../../backend/models/category";

export const getCategory = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/category`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }
  
      const data=await res.json() as ICategory[]
      return data;
    } catch (error) {
    }
  };