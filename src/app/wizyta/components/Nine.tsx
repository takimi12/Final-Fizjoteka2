import Image from "next/image";
import Photo from "../../../../public/assets/Kurs-Noszenia/star.svg";
import styles from "./Nine.module.scss";
import Opinion from "@/components/repeated/opinie/page";


async function Nine() {
    let variableOpinion = true;
	return (
		<>
			<section className={` flex flex-center ${styles.nine}`}>
				<div className={`Container m-auto`}>
					<div className={` text-center `}>
						<h2>Nie wierzysz? Sprawdź opinie.</h2>
						<h3>Zobacz, jak rodzice z sukcesami ćwiczą po moich konsultacjach.</h3>
					</div>
					<div className={` ${styles.mediumSection}`}>
					
						<h6 className={` text-center ${styles.markHeading}`}>5/5</h6>
						<div className={` flex justify-center gap-8`}>
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
						</div>
 						<Opinion  variableOpinion={variableOpinion}/>
					</div>
				</div>
			</section>
		</>
	);
}

export default Nine;
