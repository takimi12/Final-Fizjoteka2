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
                <p> <b>Numer zamówienia:</b> {orderId}</p>
                <p><b>Produkt:</b> {productName}</p>
                <p><b>Cena:</b> {productPrice} PLN</p>
                <p><b>Email:</b> {email}</p> 
            </div>
        </div>
    );
}
