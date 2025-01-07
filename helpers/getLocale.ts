import { cookies } from "next/headers";

export const getPreferredLocale = () => {
	const cookieStore = cookies();
	const localeCookie = cookieStore.get("preferredLocale");
	return localeCookie?.value || "pl";
};
