import Image from "next/image";
import Chat from "../../../public/assets/Kurs-Noszenia/chat.svg";
import styles from "./opinie.module.scss";
import Link from "next/link";
import { getPreferredLocale } from "../../../helpers/getLocale";
import { getDictionary } from "../../../lib/dictionary";

async function Opinion({ variableOpinion }: { variableOpinion: boolean }) {
	const lang = getPreferredLocale() as "pl" | "en";
	const { Repeated } = await getDictionary(lang);
  
	if (!("TestimonialsSection" in Repeated)) {
	  return <div>Brak sekcji opinii</div>;
	}
  
	const testimonials = Repeated.TestimonialsSection.testimonials;
	const moreReviews = Repeated.TestimonialsSection.moreReviews;
  
	return (
	  <section className={`${styles.Ebook}`}>
		<div className={`${styles.wraperOpinion}`}>
		  {testimonials.map(({ text, author }, index) => (
			<div key={index} className={`${variableOpinion ? styles.grey : styles.opinion}`}>
			  <span>{text}</span>
			  <h6 className="sign">{author}</h6>
			</div>
		  ))}
		</div>
		<div className={styles.related}>
		  <Image className="" src={Chat} width={20} height={20} alt="chat" />
		  <Link
			className={styles.link}
			href="https://www.facebook.com/efizjotekaMagdalenaAdas"
		  >
			<b>{moreReviews}</b>
		  </Link>
		</div>
	  </section>
	);
  }
  
  export default Opinion;
  