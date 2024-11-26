import React from "react";
import styles from "./Six.module.scss";

const data = [
    {
        "chapter": " Rozdzial 1",
        "tytuł": "Symetria i linia środkowa ciała",
        "tematy": [
            "czym jest symetria i linia środkowa ciała",
            "dlaczego symetria jest ważna",
            "co może zaniepokoić rodzica",
            "jakie profilaktyczne ćwiczenia można wykonywać z dzieckiem"
        ]
    },
    {
        "chapter": "Rozdzial 2",
        "tytuł": "Asymetria ułożeniowa",
        "tematy": [
            "czym jest asymetria ułożeniowa",
            "jakie są jej przyczyny",
            "jak mogą być konsekwencje",
            "jak odróżnić asymetrię od preferencji stron przez dziecko"
        ]
    },
    {
        "chapter": "Rozdzial 3",
        "tytuł": "Jak rozpoznać asymetrię ułożeniową u dziecka?",
        "tematy": [
            "jak miesiąc po miesiącu rozpoznać asymetrię u maluszka",
            "jak rozpoznać asymetrię w różnych pozycjach ciała",
            "czym jest asymetria główki i tułowia"
        ]
    },
    {
        "chapter": "Rozdzial 4",
        "tytuł": "Zalecenia przy asymetrii ułożeniowej",
        "tematy": [
            "jak właściwie pielęgnować dziecko z asymetrią",
            "jak angażować stronę mniej aktywną",
            "jakie znaczenie ma łóżeczko, materac i poduszka"
        ]
    },
    {
        "chapter": "Rozdzial 5",
        "tytuł": "Ćwiczenia na asymetrię",
        "tematy": [
            "praktyczne ćwiczenia do wykonywania z dzieckiem w domu",
            "przykładowy plan ćwiczeń w Aneksie"
        ]
    },
    {
        "chapter": "Rozdzial 6",
        "tytuł": "Nieleczona asymetria",
        "tematy": [
            "konsekwencje nieleczonej asymetrii",
            "dlaczego warto wdrożyć działania od razu"
        ]
    }
];

const Tvelwe = () => {
    return (
        <section className={`flex justify-center ${styles.tvelve}`}>
            <div className="container">
                <div className="flex flex-col justify-center text-center">
                    <h2>Co znajdziesz w e-booku?</h2>
                    <h6 className={`mb-5 mt-5 ${styles.subtitle}`}>
                        Udostępniam spis treści e-booka. Możesz sprawdzić, czy tematy, które poruszam są dla Ciebie ważne.
                    </h6>
                </div>
                <div className={styles.wraper}>
                    {data.map((item, index) => (
                        <div key={index} className={styles.card}>
							<h6 className={styles.chapter}>{item.chapter}</h6>
                            <h5 className="mb-4">{item.tytuł}</h5>
                            <ul className={styles.ul}>
                                {item.tematy.map((point, idx) => (
                                    <li className={styles.point} key={idx}>
                                        <span className={styles.pointer}>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tvelwe;
