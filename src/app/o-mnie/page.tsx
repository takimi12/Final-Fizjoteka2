import Hero from "./compontens/Hero";
import Second from "./compontens/Second";
import Third from "./compontens/Third";
import Four from "./compontens/Four";
import Five from "../kurs-noszenia/components/Eight";
import Six from "../../components/Homepage/Contact/page";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";

export default async function HomeLayout() {
	return (
		<>
			<Breadcrumbs />
			<Hero />
			<Second />
			<Third />
			<Four />
			<Five />
			<Six />
		</>
	);
}
