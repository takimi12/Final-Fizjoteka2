import React from "react";
import styles from "./Five.module.scss";
import Link from "next/link";
import circle from "../../../../../../public/assets/Kurs-Noszenia/Eleven/circle.svg";
import Image from "next/image";
import { getTopics } from "../../../../../../helpers/api/getTopic";
import { Button } from "../../../../../../components/AdminComponents/Subcomponents/Button";
import { ITopic } from "../../../../../../backend/models/topics";
import { getPreferredLocale } from "../../../../../../helpers/getLocale";
import { getDictionary } from "../../../../../../lib/dictionary";

export default async function Five() {
	const lang = getPreferredLocale() as "pl" | "en";
	const dictionary = await getDictionary(lang);
	const { asymetria } = dictionary;
	const { Third } = asymetria;

	const { title, subtitle, availability1, availability2 } = Third.products;

	try {
		const response = await getTopics();
		const topicsArray = response?.topics ?? [];

		const filteredTopics = topicsArray.filter((topic: ITopic) =>
			topic.categories.includes("Asymetria ułożeniowa"),
		);

		return (
			<>
				<section className={styles.Eleven} id="products">
					<div className={`Container ${styles.Container}`}>
						<div className={styles.mb10}>
							<div className={styles.top}>
								<h4>{title}</h4>
								<p>{subtitle}</p>
							</div>
						</div>
						<div className={styles.blockParent}>
							{filteredTopics.map((product: ITopic) => (
								<div key={product._id} className={styles.singleBox}>
									<div className={styles.inner}>
										<span className={styles.available}>{availability1}</span>
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

										<div className={styles.titleContainer}>
											<Link href="#" className={styles.anchor}>
												<h4 className={styles.title}>{product.title}</h4>
											</Link>
											<p className={styles.subtitle}>{product.subtitle}</p>
										</div>

										<div>
											<ul className={styles.listParent}>
												{product.description
													.split(". ")
													.filter((sentence) => sentence.length > 0)
													.map((sentence: string, idx: number) => (
														<li className={styles.list} key={idx}>
															{sentence.trim()}
														</li>
													))}
											</ul>
											<div className={styles.prizeContainer}>
												<Image src={circle} width={15} height={15} alt="online" />
												<p className={styles.availableprize}>{availability2}</p>
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
	} catch (error) {
		return (
			<section className={styles.Eleven} id="products">
				<div className={`Container ${styles.Container}`}>
					<p>Wystąpił problem z załadowaniem produktów. Spróbuj ponownie później.</p>
				</div>
			</section>
		);
	}
}
