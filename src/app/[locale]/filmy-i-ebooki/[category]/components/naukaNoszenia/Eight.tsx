import Image from "next/image";
import Photo from "../../../../../../../public/assets/Kurs-Noszenia/star.svg";
import styles from "./Eight.module.scss";
import Opinion from "@/components/repeated/opinie/page";

async function Eight() {
	return (
		<>
			<section className={` flex flex-center ${styles.eight}`}>
				<div className={`Container m-auto`}>
					<div className={` text-center `}>
						<h2>Dlaczego możesz mi zaufać?</h2>
						<h3>Są ze mną już tysiące rodziców</h3>
						<div className={` ${styles.blockParent} flex gap-10 mt-10`}>
							<div className={` ${styles.inner} w-full`}>
								<h5>50 TYS. +</h5>
								<p>
									Ponad 50 tys. osób każdego miesiąca znajduje pomoc na moim blogu. To najchętniej
									czytany blog o tej tematyce!
								</p>
							</div>
							<div className={` ${styles.inner} w-full`}>
								<h5>3 000 +</h5>
								<p>Nawet 3 000 osób uczestniczy na żywo w moich webinarach.</p>
							</div>
							<div className={` ${styles.inner} w-full`}>
								<h5>100 000 +</h5>
								<p>
									Ponad 100 tys rodziców i fizjoterapeutów należy do mojej społeczności na
									Instagramie.
								</p>
							</div>
						</div>
					</div>
					<div className={` ${styles.mediumSection}`}>
						<h3 className={`text-center`}>Opinie mam są najlepszą recenzją mojej pracy</h3>
						<h6>
							Dziękuję, że jesteście ❤️ To dla Was tworzę. To dzięki Waszym komentarzom mam siłę, by
							uczyć się dalej, a później dzielić się tą wiedzą.
						</h6>
						<h6>5/5</h6>
						<div className={` flex justify-center gap-8`}>
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
							<Image src={Photo} alt="Gwiazdki" width={20} height={20} />
						</div>
						<Opinion variableOpinion={false} />
					</div>
				</div>
			</section>
		</>
	);
}

export default Eight;
