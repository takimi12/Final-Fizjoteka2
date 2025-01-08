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
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/przelewy24`, {
                cartItems: cartItems.map((el) => ({
                    id: el._id,
                    quantity: el.quantity,
                })),
                email,
                nameAndSurname,
                companyName: isCompany ? companyName : "",
                nip: isCompany ? nip : "",
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
            <div className={`Container ${styles.container} m-auto flex`}>
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
                                                        {item.price} zł <span className={styles.normalFont}>(zawiera vat)</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className={styles.totalAmount}>
                                <span>
                                    Całkowita należność:{" "}
                                    {totalPrice > 0 ? <strong>{totalPrice.toFixed(2)}</strong> : "0"}
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
                                    />
                                    <button type="button">Dodaj rabat</button>
                                </div>
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
                            <label className={styles.checkboxContainer}>
                                <input
                                    className={styles.input}
                                    type="checkbox"
                                    checked={isTermsAccepted}
                                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                                    required
                                />
                                <span>
                                    Zapoznałem się z polityką prywatności oraz regulaminem sklepu. Dobrowolnie zrzekam
                                    się z prawa do odstąpienia od produktu w terminie 14 dni od zakupu - Wymagane
                                </span>
                            </label>
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