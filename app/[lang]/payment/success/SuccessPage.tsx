
interface SuccessPageProps {
    orderId: string;
    productName: string;
    productPrice: number;
}

export default function SuccessPage({ orderId, productName, productPrice }: SuccessPageProps) {
    return (
        <div>
            <h1>Płatność zakończona sukcesem!</h1>
            <p>Numer zamówienia: {orderId}</p>
            <p>Produkt: {productName}</p>
            <p>Cena: {productPrice} PLN</p>
        </div>
    );
}
