import React from "react";
import styles from "./Seven.module.scss";
import Link from "next/link";
import circle from "../../../../../..//public/assets/Kurs-Noszenia/Eleven/circle.svg";
import Image from "next/image";
import { getTopics } from "../../../../../../helpers/api/getTopic";
import { Button } from "../../../../../../components/AdminComponents/Subcomponents/Button";
import { ITopic } from "../../../../../../backend/models/topics";

const Seven = async () => {
	try {
		const response = await getTopics();


		if (!response || !Array.isArray(response.topics)) {
			return <div>Error loading topics</div>;
		}

		const topicsArray: ITopic[] = response.topics;
		const filteredTopics = topicsArray.filter((topic: ITopic) =>
			topic.categories.includes("Rozwój dziecka"),
		);

		return (
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
						{filteredTopics.length === 0 ? (
							<p>No topics available in this category.</p>
						) : (
							filteredTopics.map((product, index) => (
								<div key={index} className={styles.singleBox}>
									<div className={styles.inner}>
										<span className={styles.available}>Produkt Dostępny</span>
										<span className={styles.date}>
											{new Date(product.createdAt).toLocaleDateString()}
										</span>
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
												<p className={styles.availableprize}>Produkt dostępny</p>
											</div>
											<div className={styles.footer}>
												<p className={styles.price}>{product.price}zł</p>
												<Button product={product} />
											</div>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</section>
		);
	} catch (error) {
		return <div>Error loading topics</div>;
	}
};

export default Seven;
