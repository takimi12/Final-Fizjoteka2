"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFormState } from "react-hook-form";
import { addToCart, removeFromCart, selectTotalPrice, clearCart } from "../../Redux/Cartslice";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs";
import styles from "./koszyk.module.scss";
import axios from "axios";
import { RootState } from "../../Redux/Store";

interface FormInputs {
    nameAndSurname: string;
    email: string;
    companyName?: string;
    nip?: string;
    isTermsAccepted: boolean;
}

interface DiscountFormInputs {
    discountCode: string;
}

const Cartpage: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart);
    const totalPrice = useSelector(selectTotalPrice);

    const [isCompany, setIsCompany] = useState<boolean>(false);
    const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
    const [isSubmittingDiscount, setIsSubmittingDiscount] = useState(false);
    const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

    const {
        register: registerMain,
        handleSubmit,
        formState: { errors: mainErrors },
    } = useForm<FormInputs>({
        defaultValues: {
            nameAndSurname: "",
            email: "",
            companyName: "",
            nip: "",
            isTermsAccepted: false,
        },
    });

    const {
        register: registerDiscount,
        handleSubmit: handleDiscountSubmit,
        formState: { errors: discountErrors },
        reset: resetDiscount,
        setError: setDiscountError,
    } = useForm<DiscountFormInputs>({
        defaultValues: {
            discountCode: "",
        },
    });

    const finalPrice = totalPrice * (1 - appliedDiscount / 100);

    const validateDiscountCode = async (data: DiscountFormInputs) => {
        setIsSubmittingDiscount(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/discountCode`);
            const codes = response.data.data;
            
            const foundCode = codes.find((code: { code: string }) => 
                code.code.toLowerCase() === data.discountCode.toLowerCase()
            );

            if (foundCode) {
                setAppliedDiscount(foundCode.discount);
                resetDiscount();
            } else {
                setDiscountError('discountCode', {
                    type: 'manual',
                    message: 'Nieprawidłowy kod rabatowy'
                });
                setAppliedDiscount(0);
            }
        } catch (error) {
            setDiscountError('discountCode', {
                type: 'manual',
                message: 'Błąd podczas weryfikacji kodu'
            });
            setAppliedDiscount(0);
        } finally {
            setIsSubmittingDiscount(false);
        }
    };

    const onSubmit = async (data: FormInputs) => {
        setIsSubmittingPayment(true);
        try {
            const discountedPrice = totalPrice * (1 - appliedDiscount / 100);
            
            const { data: responseData } = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/przelewy24`, {
                cartItems: cartItems.map((el) => ({
                    id: el._id,
                    quantity: el.quantity,
                    price: el.price * (1 - appliedDiscount / 100)
                })),
                email: data.email,
                nameAndSurname: data.nameAndSurname,
                companyName: isCompany ? data.companyName : "",
                nip: isCompany ? data.nip : "",
                appliedDiscount,
                totalPrice: discountedPrice,
                originalPrice: totalPrice
            });
    
            if (responseData && responseData.url) {
                dispatch(clearCart()); 
                window.location.href = responseData.url;
            }
        } catch (error) {
            console.error("Błąd płatności:", error);
            alert("Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.");
        } finally {
            setIsSubmittingPayment(false);
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
                    <div className={styles.cart}>
                        <div className={styles.orderSummary}>
                            <h2>PODSUMOWANIE ZAMÓWIENIA:</h2>
                            <div className={styles.order}>
                                {cartItems.map((item) => (
                                    <React.Fragment key={item._id}>
                                        <div className={styles.orders}>
                                            <div className={styles.parentWrapper}>
                                                <div>
                                                    <h5 className={styles.topText}>{item.title}</h5>
                                                    <p className={styles.bottomText}>
                                                        {item.price} zł <span className={styles.normalFont}>(zawiera vat)</span>
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemoveFromCart(item)}
                                                    className={styles.removeButton}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className={styles.totalAmount}>
                                {appliedDiscount > 0 && (
                                    <div className={styles.originalPrice}>
                                        Cena przed rabatem: {totalPrice.toFixed(2)} zł
                                    </div>
                                )}
                                <span>
                                    Całkowita należność:{" "}
                                    {finalPrice > 0 ? <strong>{finalPrice.toFixed(2)}</strong> : "0"} zł
                                </span>
                            </div>
                            <div className={styles.discountCode}>
                                <form onSubmit={handleDiscountSubmit(validateDiscountCode)} className={styles.discountForm}>
                                    <label htmlFor="discountCode">Kod rabatowy</label>
                                    <div className={styles.inputContainer}>
                                        <input
                                            id="discountCode"
                                            {...registerDiscount("discountCode", {
                                                required: "Wprowadź kod rabatowy",
                                                minLength: {
                                                    value: 3,
                                                    message: "Kod musi mieć minimum 3 znaki"
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z0-9]+$/,
                                                    message: "Kod może zawierać tylko litery i cyfry"
                                                }
                                            })}
                                            className={discountErrors.discountCode ? styles.errorInput : ''}
                                        />
                                        <button 
                                            type="submit"
                                            className={styles.discountButton}
                                            disabled={isSubmittingDiscount}
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
                                    {discountErrors.discountCode && (
                                        <span className={styles.errorText}>
                                            {discountErrors.discountCode.message}
                                        </span>
                                    )}
                                    {appliedDiscount > 0 && (
                                        <p className={styles.discountApplied}>
                                            Rabat {appliedDiscount}% został naliczony
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className={styles.orderFormSecond}>
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
                                    {...registerMain("nameAndSurname", {
                                        required: "Pole wymagane",
                                        minLength: {
                                            value: 3,
                                            message: "Minimum 3 znaki"
                                        }
                                    })}
                                />
                                {mainErrors.nameAndSurname && (
                                    <span className={styles.errorText}>
                                        {mainErrors.nameAndSurname.message}
                                    </span>
                                )}
                            </label>
                            <label className={styles.label}>
                                Email
                                <input
                                    {...registerMain("email", {
                                        required: "Pole wymagane",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Nieprawidłowy format email"
                                        }
                                    })}
                                />
                                {mainErrors.email && (
                                    <span className={styles.errorText}>
                                        {mainErrors.email.message}
                                    </span>
                                )}
                            </label>
                            {isCompany && (
                                <>
                                    <label className={styles.label}>
                                        Nazwa firmy
                                        <input
                                            {...registerMain("companyName", {
                                                required: isCompany ? "Pole wymagane" : false,
                                                minLength: {
                                                    value: 2,
                                                    message: "Minimum 2 znaki"
                                                }
                                            })}
                                        />
                                        {mainErrors.companyName && (
                                            <span className={styles.errorText}>
                                                {mainErrors.companyName.message}
                                            </span>
                                        )}
                                    </label>
                                    <label className={styles.label}>
                                        NIP
                                        <input
                                            {...registerMain("nip", {
                                                required: isCompany ? "Pole wymagane" : false,
                                                pattern: {
                                                    value: /^\d{10}$/,
                                                    message: "NIP musi składać się z 10 cyfr"
                                                }
                                            })}
                                        />
                                        {mainErrors.nip && (
                                            <span className={styles.errorText}>
                                                {mainErrors.nip.message}
                                            </span>
                                        )}
                                    </label>
                                </>
                            )}
                            <label className={styles.checkboxContainerbottom}>
                                <div className={styles.inputWithText}>
                                    <input
                                        type="checkbox"
                                        className={styles.inputAccept}
                                        {...registerMain("isTermsAccepted", {
                                            required: "Musisz zaakceptować regulamin"
                                        })}
                                    />
                                    <span className={styles.labelText}>
                                        Zapoznałem się z polityką prywatności oraz regulaminem sklepu. Dobrowolnie zrzekam
                                        się z prawa do odstąpienia od produktu w terminie 14 dni od zakupu - Wymagane
                                    </span>
                                </div>
                                {mainErrors.isTermsAccepted && (
                                    <span className={styles.errorText}>
                                        {mainErrors.isTermsAccepted.message}
                                    </span>
                                )}
                            </label>

                            <button 
                                type="submit"
                                className={`button ${styles.paymentButton}`}
                                disabled={isSubmittingPayment}
                            >
                                {isSubmittingPayment ? (
                                    <span className="flex items-center justify-center">
                                        <span className={styles.spinner}></span>
                                        Przetwarzanie...
                                    </span>
                                ) : (
                                    "Kupuję i płacę"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Cartpage;