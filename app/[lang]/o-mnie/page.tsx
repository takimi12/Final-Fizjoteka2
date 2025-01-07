import Hero from "./compontens/Hero";
import Second from "./compontens/Second";
import Third from "./compontens/Third";
import Four from "./compontens/Four";
import Five from "./compontens/Five";
import Six from "../../../components/Homepage/Contact/page";

export default async function HomeLayout() {
	return (
		<>
			<Hero />
			<Second />
			<Third />
			<Four />
			<Five />
			<Six />
		</>
	);
}
