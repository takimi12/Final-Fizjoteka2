import Hero from "./asymetriaUlozeniowa/Hero";
import Second from "../../../kurs-noszenia/components/Second"
import Third from "./asymetriaUlozeniowa/Third";
import Fourth from "../../../kurs-noszenia/components/Seven";
import Five from "./asymetriaUlozeniowa/Five";
import Six from "./asymetriaUlozeniowa/Six";
import Seven from "../../../kurs-noszenia/components/Nine"
import Contact from "../../../../../components/Homepage/Contact/page";
import BubbleSection from "../../../kurs-noszenia/components/Ten";
import OpinionSection from "../../../kurs-noszenia/components/Eight";


export default async function Asymetria() {

	return (
		<>
			<Hero />
			<Second />
			<Third />
			<Fourth />
			<Five />
			<Six />
			<Seven />
			<BubbleSection />
			<OpinionSection />
			<Contact />
		</>
	);
}
