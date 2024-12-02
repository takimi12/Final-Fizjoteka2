import User from "../../../../backend/models/user"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Document } from "mongoose";

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

type Lean<T> = Omit<T, keyof Document>;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user._id) {
    redirect("/"); 
  }

  const user: Lean<IUser> | null = await User.findById(session.user._id).lean();

  if (!user || user.role !== "admin") {
    redirect("/"); 
  }


  return <div>{children}</div>;
}
