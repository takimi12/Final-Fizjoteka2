// app/admin/layout.tsx
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession  } from "next-auth";
import { redirect } from "next/navigation";

declare module 'next-auth' {
    interface Session {
      user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
      }
    }
  }


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //@ts-ignore
    const data  = await getServerSession(authOptions);

    if (!data || data.user.role !== 'admin') {
        console.log('ddd')
              redirect("/"); 
    }

  return <div>{children}</div>;
}


