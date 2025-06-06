import Image from "next/image";
import styles from "./Contact.module.scss";
import facebook from "../../../public/assets/HomePage/Contact/facebook.svg";
import instagram from "../../../public/assets/HomePage/Contact/instagram.svg";
import youtube from "../../../public/assets/HomePage/Contact/youtube.svg";
import Button from "../../repeated/button/page";
import { getPreferredLocale } from "../../../helpers/getLocale";
import { getDictionary } from "../../../lib/dictionary";

const iconMap = {
	Facebook: facebook,
	Youtube: youtube,
	Instagram: instagram,
} as const;

type ChannelName = keyof typeof iconMap;

async function Contact() {
	const lang = getPreferredLocale() as "pl" | "en";

	const { ContactSection } = (await getDictionary(lang)) as {
		ContactSection: {
			title: string;
			subtitle: string;
			channels: {
				name: ChannelName;
				description: string;
				link: string;
			}[];
		};
	};

	return (
		<>
			<section className={`${styles.Help}`}>
				<div className={`Container`}>
					<div className={`${styles.topSection}`}>
						<h2 className={`${styles.title}`}>{ContactSection.title}</h2>
						<h3 className={`${styles.subtitle}`}>{ContactSection.subtitle}</h3>
					</div>
					<div className={`${styles.itemWraper}`}>
						{ContactSection.channels.map((channel, index) => (
							<div key={index} className={`${styles.bottomItem}`}>
								<div className="iconBox">
									<Image width={25} height={25} src={iconMap[channel.name]} alt={channel.name} />
								</div>
								<h3>{channel.name}</h3>
								<p className={styles.paragraph}>{channel.description}</p>
								<Button link={channel.link} link1="Dołącz" />
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default Contact;
