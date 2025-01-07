import Nauka from "./components/NaukaNoszenia";
import Asymetria from "./components/Asymetriaulozeniowa";
import Rozwoj from "./components/RozwojDziecka";

export const generateStaticParams = async ({ params }: { params: { category: string } }) => {
	return [
		{ category: "Asymetria-ułozeniowa" },
		{ category: "Rozwoj-dziecka" },
		{ category: "Nauka-noszenia" },
	];
};

export default function Page({ params }: { params: { category: string } }) {
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
