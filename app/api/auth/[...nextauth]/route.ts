import NextAuth from "next-auth";
import { authOptions } from "../../../../libs/authOption"; 

//comment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };