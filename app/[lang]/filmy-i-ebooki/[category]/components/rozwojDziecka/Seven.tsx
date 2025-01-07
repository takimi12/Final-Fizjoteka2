import React from "react";
import styles from "./Seven.module.scss";
import Link from "next/link";
import circle from "../../../../../..//public/assets/Kurs-Noszenia/Eleven/circle.svg";
import Image from "next/image";
import { getTopics } from "../../../../../../helpers/api/getTopic";
import {Button} from "../../../../../../components/AdminComponents/Subcomponents/Button";

interface Topic {
	_id: string;
	title: string;
	subtitle: string;
	description: string;
	categories: string[];
	price: string;
	imageFileUrl: string;
	pdfFileUrl: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

const Seven = async () => {
	const response = await getTopics();
	const topicsArray: Topic[] = response.topics;
	const filteredTopics = topicsArray.filter((topic: Topic) =>
		topic.categories.includes("Rozwój dziecka"),
	);

	return (
		<>
			<section className={styles.Eleven} id="products">
				<div className={`${styles.container} Container`}>
					<div className={styles.textCenter}>
						<div className={styles.top}>
							<h4>Znajdź produkt odpowiedni dla Ciebie</h4>
							<p>
								Uzyskując nieograniczony dostęp do filmów, masz szansę nadrobić webinary w wygodnym
								dla siebie momencie.
							</p>
						</div>
					</div>
					<div className={styles.blockParent}>
						{filteredTopics.map((product, index) => (
							<div key={index} className={styles.singleBox}>
								<div className={styles.inner}>
									<span className={styles.available}>Produkt Dostępny</span>
									<span className={styles.date}>{product.createdAt}</span>
									<div className={styles.blockImage}>
										<Image
											src={product.imageFileUrl}
											width={200}
											height={200}
											alt={product.title}
										/>
									</div>
									<div className={styles.titleWrapper}>
										<Link href="#" className={styles.anchor}>
											<h4 className={styles.title}>{product.title}</h4>
										</Link>
										<p className={styles.subtitle}>{product.subtitle}</p>
									</div>
									<div className={styles.lists}>
										<ul className={styles.listParent}>
											{product.description.split(". ").map((sentence, idx) => (
												<li className={styles.list} key={idx}>
													{sentence.trim()}.
												</li>
											))}
										</ul>
										<div className={styles.availableWrapper}>
											<Image src={circle} width={15} height={15} alt="online" />
											<p className={styles.availableprize}>Produkt dostępny </p>
										</div>
										<div className={styles.footer}>
											<p className={styles.price}>{product.price}</p>
											{/* <Button product={product} /> */}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Seven;
