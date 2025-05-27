import React from "react";
import styles from "./Eleven.module.scss";
import Link from "next/link";
import circle from "../../../../public/assets/Kurs-Noszenia/Eleven/circle.svg";
import Image from "next/image";
import { getTopics } from "../../../../helpers/api/getTopic";
import { Button } from "../../../../components/AdminComponents/Subcomponents/Button";
import { IProduct } from "../../../../backend/models/product";

const formatDate = (dateString: string | Date) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("pl-PL", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const ElevenComponent = async () => {
	const response = await getTopics();
	const topicsArray: IProduct[] = response.topics;

	const filteredTopics = topicsArray.filter((topic: IProduct) =>
		topic.categories.includes("Nauka noszenia"),
	);

	return (
		<>
			<section className={styles.Eleven} id="products">
				<div className={`Container ${styles.Container}`}>
					<div className={styles.top}>
						<h4>Znajdź produkt odpowiedni dla Ciebie</h4>
						<p>
							Uzyskując nieograniczony dostęp do filmów, masz szansę nadrobić webinary w wygodnym
							dla siebie momencie.
						</p>
					</div>
					<div className={styles.blockParent}>
						{filteredTopics.map((product: IProduct, index) => (
							<div key={index} className={styles.singleBox}>
								<div className={styles.inner}>
									<span className={styles.available}>Produkt Dostępny</span>
									<span className={styles.date}>{formatDate(product.createdAt)}</span>

									<div className={styles.imageContainer}>
										<Image
											src={product.imageFileUrl}
											width={200}
											height={200}
											alt={product.title}
										/>
									</div>

									<div className={styles.title}>
										<Link href="#">
											<h4 className={styles.anchor}>{product.title}</h4>
										</Link>
										<p className={styles.subtitle}>{product.subtitle}</p>
									</div>

									<div className={styles.descriptionContainer}>
										<ul className={styles.listParent}>
											{product.description.split(". ").map((sentence, idx) => (
												<li className={styles.list} key={idx}>
													{sentence.trim()}.
												</li>
											))}
										</ul>
										<div className={styles.availabilityContainer}>
											<Image src={circle} width={15} height={15} alt="online" />
											<p className={styles.availableprize}>Produkt dostępny</p>
										</div>

										<div className={styles.priceContainer}>
											<p className={styles.price}>{product.price} zł</p>
											<Button product={product} />
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

export default ElevenComponent;
