import Nauka from "./components/NaukaNoszenia";
import Asymetria from "./components/Asymetriaulozeniowa";
import Rozwoj from "./components/RozwojDziecka";
export const generateStaticParams = async () => {
	return [
	  { lang: "pl", category: "Nauka-noszenia" },
	  { lang: "pl", category: "Asymetria-ulozeniowa" },
	  { lang: "pl", category: "Rozwoj-dziecka" },
	  { lang: "en", category: "Nauka-noszenia" },
	  { lang: "en", category: "Asymetria-ulozeniowa" },
	  { lang: "en", category: "Rozwoj-dziecka" },
	];
  };
  
  export default async function Page({ 
	params 
  }: { 
	params: { lang: string; category: string } 
  }) {
	let content;
  
	if (params.category === "Nauka-noszenia") {
	  content = <Nauka />;
	} else if (params.category === "Rozwoj-dziecka") {
	  content = <Rozwoj />;
	} else if (params.category === "Asymetria-ulozeniowa") {
	  content = <Asymetria />;
	} else {
	  content = <div>Default content or 404 page</div>;
	}
  
	return <div>{content}</div>;
  }