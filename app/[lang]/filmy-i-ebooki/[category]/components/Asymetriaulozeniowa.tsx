import Hero from "./asymetriaUlozeniowa/Hero";
import Second from "./asymetriaUlozeniowa/Second";
import Third from "./asymetriaUlozeniowa/Third";
import Fourth from "./asymetriaUlozeniowa/Fourth";
import Five from "./asymetriaUlozeniowa/Five";
import Six from "./asymetriaUlozeniowa/Six";
import Seven from "./asymetriaUlozeniowa/Seven";
import Nine from "./asymetriaUlozeniowa/Nine";
import Contact from "../../../../../components/Homepage/Contact/page";
import BubbleSection from "../../../kurs-noszenia/components/Ten";
import OpinionSection from "../../../kurs-noszenia/components/Eight";

export default function Asymetria() {
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
			<Nine />
			<OpinionSection />
			<Contact />
		</>
	);
}
