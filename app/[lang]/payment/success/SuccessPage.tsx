import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../Redux/Cartslice";

interface SuccessPageProps {
    orderId: string;
    productName: string;
    productPrice: number;
}

export default function SuccessPage({ orderId, productName, productPrice }: SuccessPageProps) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);
    return (
        <div className="Container">
            <div>
            <h1>Płatność zakończona sukcesem!</h1>
            <p>Numer zamówienia: {orderId}</p>
            <p>Produkt: {productName}</p>
            <p>Cena: {productPrice} PLN</p>
        </div>
        </div>
    );
}
