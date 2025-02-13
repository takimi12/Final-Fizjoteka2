import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../Redux/Cartslice";
import styles from "./Success.module.scss";

interface SuccessPageProps {
    orderId: string;
    productName: string;
    productPrice: number;
    email: string;
}

export default function SuccessPage({ orderId, productName, productPrice, email }: SuccessPageProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div className={styles.Container}>
            <div className={` ${styles.inner} Container`}>
                <h2 className={styles.title}>Płatność zakończona sukcesem!</h2>
                <div className={styles.details}>
                <p> <span className={styles.span}>Numer zamówienia:</span> {orderId}</p>
                <p><span className={styles.span}>Produkt:</span> {productName}</p>
                <p><span className={styles.span}>Cena:</span> {productPrice} PLN</p>
                <p><span className={styles.span}>Email:</span> {email}</p> 
                </div>
            </div>
        </div>
    );
}
