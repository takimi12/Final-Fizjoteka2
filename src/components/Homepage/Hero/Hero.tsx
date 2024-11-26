import Image from "next/image";
import Photo from "../../../../public/assets/HomePage/Hero/helloSection_magda.webp";
import styles from "./Hero.module.scss";
import { useTranslations } from 'next-intl';


function Hero() {

	const t = useTranslations('Homepage');
	return (
		<section className={`${styles.Hero}`}>
		<div className={`Container`}>
		  <div className={` ${styles.Inner}`}>
			<div className={` ${styles.leftSection}`}>
			  <div className={`${styles.title}`}>
				<h1 className={` ${styles.main}`}>{t('greeting')}</h1>
			  </div>
			  <p className={`${styles.paragraph} my-5`}>
				{t('description1')}
			  </p>
			  <p className={`${styles.paragraph}`}>
				{t('description2')}
			  </p>
			</div>
			<div className={` ${styles.rightSection}`}>
			  <Image
				src={Photo}
				width={408}
				height={404}
				alt={t('photoAlt')}
				aria-label={t('photoAlt')}
			  />
			</div>
		  </div>
		</div>
	  </section>
	);
}

export default Hero;
