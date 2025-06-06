import React from "react";
import Hero from "./Hero/Hero";
import Help from "./Help/page";
import Ebook from "./Ebook/page";
import Contact from "./Contact/page";

export default async function HomeLayout() {
	return (
		<>
			<Hero />
			<Help />
			<Ebook />
			<Contact />
		</>
	);
}
