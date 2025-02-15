"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, selectTotalPrice } from "../../Redux/Cartslice";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs";
import styles from "./koszyk.module.scss";
import axios from "axios";
import { RootState } from "../../Redux/Store";

const Cartpage: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart);
    const totalPrice = useSelector(selectTotalPrice);

    const [isCompany, setIsCompany] = useState<boolean>(false);
    const [nameAndSurname, setNameAndSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [nip, setNip] = useState<string>("");
    const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
    const [discountCode, setDiscountCode] = useState<string>("");
    const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
    const [discountError, setDiscountError] = useState<string>("");
    const [isSubmittingDiscount, setIsSubmittingDiscount] = useState(false);

    // Obliczanie końcowej ceny po rabacie
    const finalPrice = totalPrice * (1 - appliedDiscount / 100);

    const validateDiscountCode = async () => {
        if (!discountCode) {
            setDiscountError("Wprowadź kod rabatowy");
            return;
        }

        if (discountCode.length < 3) {
            setDiscountError("Kod musi mieć minimum 3 znaki");
            return;
        }

        if (!/^[A-Za-z0-9]+$/.test(discountCode)) {
            setDiscountError("Kod może zawierać tylko litery i cyfry");
            return;
        }

        setIsSubmittingDiscount(true);
        setDiscountError("");

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/discountCode`);
            const codes = response.data.data;
            
            const foundCode = codes.find((code: { code: string }) => 
                code.code.toLowerCase() === discountCode.toLowerCase()
            );

            if (foundCode) {
                setAppliedDiscount(foundCode.discount);
                setDiscountCode("");
            } else {
                setDiscountError("Nieprawidłowy kod rabatowy");
                setAppliedDiscount(0);
            }
        } catch (error) {
            setDiscountError("Błąd podczas weryfikacji kodu");
            setAppliedDiscount(0);
        } finally {
            setIsSubmittingDiscount(false);
        }
    };

    const handlePayment = async (): Promise<void> => {
        if (!nameAndSurname || !email) {
            alert("Proszę wypełnić imię, nazwisko oraz email");
            return;
        }

        if (isCompany && (!companyName || !nip)) {
            alert("Proszę wypełnić dane firmowe");
            return;
        }

        if (!isTermsAccepted) {
            alert("Proszę zaakceptować regulamin");
            return;
        }

        try {
            // Przygotowanie produktów z uwzględnieniem rabatu
            const discountedCartItems = cartItems.map(item => ({
                id: item._id,
                quantity: item.quantity,
                // Zaokrąglamy cenę do 2 miejsc po przecinku
                price: Number((item.price * (1 - appliedDiscount / 100)).toFixed(2))
            }));

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/przelewy24`, {
                cartItems: discountedCartItems,
                email,
                nameAndSurname,
                companyName: isCompany ? companyName : "",
                nip: isCompany ? nip : "",
                appliedDiscount,
                // Wysyłamy zarówno cenę końcową jak i oryginalną
                totalPrice: Number(finalPrice.toFixed(2)), // Zaokrąglamy do 2 miejsc po przecinku
                originalPrice: totalPrice,
                // Dodatkowe informacje o rabacie
                discountInfo: appliedDiscount > 0 ? {
                    discountPercentage: appliedDiscount,
                    amountSaved: Number((totalPrice - finalPrice).toFixed(2))
                } : null
            });

            if (data && data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Błąd płatności:", error);
            alert("Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.");
        }
    };

    const handleRemoveFromCart = (item: { _id: string }) => {
        dispatch(removeFromCart(item));
    };

    return (
        <>
            <div className={`Container ${styles.container} `}>
                <Breadcrumbs />
                <div className={styles.wrapper}>
                    <div className={` ${styles.cart}`}>
                        <div className={styles.orderSummary}>
                            <h2>PODSUMOWANIE ZAMÓWIENIA:</h2>
                            <div className={styles.order}>
                                {cartItems.map((item) => (
                                    <React.Fragment key={item._id}>
                                        <div className={styles.orders}>
                                            <div>
                                                <div>
                                                    <h5 className={styles.topText}>{item.title}</h5>
                                                    <p className={styles.bottomText}>
                                                        {appliedDiscount > 0 ? (
                                                            <>
                                                                <span className={styles.originalPrice}>
                                                                    {item.price} zł
                                                                </span>
                                                                <span className={styles.discountedPrice}>
                                                                    {(item.price * (1 - appliedDiscount / 100)).toFixed(2)} zł
                                                                </span>
                                                            </>
                                                        ) : (
                                                            `${item.price} zł`
                                                        )}
                                                        <span className={styles.normalFont}>(zawiera vat)</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className={styles.totalAmount}>
                                {appliedDiscount > 0 && (
                                    <div className={styles.originalPrice}>
                                        <div>Cena przed rabatem: {totalPrice.toFixed(2)} zł</div>
                                        <div>Wysokość rabatu: {appliedDiscount}%</div>
                                        <div>Zaoszczędzono: {(totalPrice - finalPrice).toFixed(2)} zł</div>
                                    </div>
                                )}
                                <span className={styles.finalPrice}>
                                    Całkowita należność:{" "}
                                    {finalPrice > 0 ? <strong>{finalPrice.toFixed(2)}</strong> : "0"} zł
                                </span>
                            </div>

                            <div className={styles.discountCode}>
                                <label htmlFor="discount">Kod rabatowy</label>
                                <div className={styles.inputContainer}>
                                    <input
                                        type="text"
                                        id="discount"
                                        name="discount"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        className={discountError ? styles.errorInput : ''}
                                    />
                                    <button 
                                        type="button" 
                                        onClick={validateDiscountCode}
                                        disabled={isSubmittingDiscount}
                                        className={styles.discountButton}
                                    >
                                        {isSubmittingDiscount ? (
                                            <span className="flex items-center">
                                                <span className={styles.spinner}></span>
                                                Weryfikacja...
                                            </span>
                                        ) : (
                                            "Dodaj rabat"
                                        )}
                                    </button>
                                </div>
                                {discountError && (
                                    <span className={styles.errorText}>
                                        {discountError}
                                    </span>
                                )}
                                {appliedDiscount > 0 && (
                                    <p className={styles.discountApplied}>
                                        Rabat {appliedDiscount}% został naliczony
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderFormSecond}>
                        <label className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                checked={isCompany}
                                onChange={() => setIsCompany(!isCompany)}
                            />
                            <span>Zamówienie jako firma</span>
                        </label>

                        <div className={styles.paymentDetails}>
                            <h2>DANE PŁATNOŚCI</h2>
                            <label className={styles.label}>
                                Imię i nazwisko
                                <input
                                    type="text"
                                    value={nameAndSurname}
                                    onChange={(e) => setNameAndSurname(e.target.value)}
                                    required
                                />
                            </label>
                            <label className={styles.label}>
                                Email
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                            {isCompany && (
                                <>
                                    <label className={styles.label}>
                                        Nazwa firmy
                                        <input
                                            type="text"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label className={styles.label}>
                                        NIP
                                        <input
                                            type="text"
                                            value={nip}
                                            onChange={(e) => setNip(e.target.value)}
                                            required
                                        />
                                    </label>
                                </>
                            )}

                            <fieldset className={styles.fieldset}>
                                <label>
                                    <input
                                        className={styles.input}
                                        type="checkbox"
                                        checked={isTermsAccepted}
                                        onChange={(e) => setIsTermsAccepted(e.target.checked)}
                                        required
                                    />
                                    <span>
                                        Zapoznałem się z polityką prywatności oraz regulaminem sklepu. Dobrowolnie zrzekam się z prawa do odstąpienia od produktu w terminie 14 dni od zakupu - Wymagane
                                    </span>
                                </label>
                            </fieldset>

                            <button className={`button`} onClick={handlePayment}>
                                Kupuję i płacę
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cartpage;