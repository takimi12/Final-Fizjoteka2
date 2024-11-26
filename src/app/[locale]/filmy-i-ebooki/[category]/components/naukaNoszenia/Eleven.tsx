import React from "react";
import styles from "./Eleven.module.scss";
import Link from "next/link";
import circle from "../../../../../../..//public/assets/Kurs-Noszenia/Eleven/circle.svg";
import Image from "next/image";
import { getTopics } from "../../../../../../../helpers/api/getTopic";
import Button from "../../../../../../components/AdminComponents1/components/button";

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

interface Product {
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

const ElevenComponent = async () => {
    const response = await getTopics();
    const topicsArray: Topic[] = response.topics;
     
    const filteredTopics = topicsArray.filter((topic: Topic) => 
    topic.categories.includes('Nauka noszenia')
);


    

    return (
        <>
            <section className={`flex justify-center ${styles.Eleven}`} id="products">
                <div className={`Container flex flex-col`}>
                    <div className={`text-center mb-10`}>
                        <div className={styles.top}>
                            <h4>Znajdź produkt odpowiedni dla Ciebie</h4>
                            <p>Uzyskując nieograniczony dostęp do filmów, masz szansę nadrobić webinary w wygodnym dla siebie momencie.</p>
                        </div>
                    </div>
                    <div className={`flex gap-10 ${styles.blockParent}`}>
                        {filteredTopics.map((product:Product , index) => (
                            <div key={index} className={`flex w-full flex-col ${styles.singleBox}`}>
                                <div className={styles.inner}>
                                    <span className={styles.available}>Produkt Dostępny</span>
                                    <span className={styles.date}>{product.createdAt}</span>
                                    
                                    <div className={`mb-4 flex justify-center  ${styles.blockImage}`}>
                                        <Image src={product.imageFileUrl} width={200} height={200} alt={product.title} />
                                    </div>

                                    <div className={`mb-5 ${styles.title}`}>
                                        <Link href="#" className={styles.anchor}>
                                            <h4 className={styles.title}>{product.title}</h4>
                                        </Link>
                                        <p className={styles.subtitle}>{product.subtitle}</p>
                                    </div>

                                    <div>
                                        <ul className={`${styles.listParent} mt-4`}>
                                            {product.description.split('. ').map((sentence, idx) => (
                                                <li className={styles.list} key={idx}>{sentence.trim()}.</li>
                                            ))}
                                        </ul>
                                        <div className={`mt-auto flex justify-center gap-10`}>
                                            <Image src={circle} width={15} height={15} alt="online" />
                                            <p className={`${styles.availableprize} font-normal`}>Produkt dostępny</p>
                                        </div>
                                        
                                        <div className={`mt-10 flex items-center justify-center gap-5`}>
                                            <p className={`font-bold`}>{product.price}</p>
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
