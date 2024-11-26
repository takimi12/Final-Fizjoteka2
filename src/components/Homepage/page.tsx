
import React from 'react';
import Hero from "../Homepage/Hero/Hero";
import Help from "./Help/page";
import Ebook from "./Ebook/page";
import QuizFiz from "./Quizfizz/page";
import Contact from "./Contact/page";


export default async function HomeLayout() {
	return (
		<>
			<Hero />
			<Help />
			<Ebook />
			<QuizFiz />
			<Contact />
    
	
		</>
	);
}
