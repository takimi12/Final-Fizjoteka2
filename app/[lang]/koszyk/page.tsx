"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, selectTotalPrice } from "../../../Redux/Cartslice";
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs";
import styles from "./koszyk.module.scss";
import axios from "axios";
import { RootState } from "../../../Redux/Store";

type FormData = {
  nameAndSurname: string;
  email: string;
  companyName?: string;
  nip?: string;
  isCompany: boolean;
  isTermsAccepted: boolean;
};

const Cartpage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);
  const totalPrice = useSelector(selectTotalPrice);

  const [discountCode, setDiscountCode] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountError, setDiscountError] = useState<string>("");
  const [isSubmittingDiscount, setIsSubmittingDiscount] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      isCompany: false,
      isTermsAccepted: false
    }
  });

  const isCompany = watch("isCompany");
  const isTermsAccepted = watch("isTermsAccepted");

  const finalPrice = totalPrice * (1 - appliedDiscount / 100);

  const validateDiscountCode = async () => {
    if (!discountCode || discountCode.length < 3 || !/^[A-Za-z0-9]+$/.test(discountCode)) {
      setDiscountError("Nieprawidłowy kod rabatowy");
      return;
    }

    setIsSubmittingDiscount(true);
    setDiscountError("");

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/discountCode`);
      const codes = response.data.data;
      const foundCode = codes.find((code: { code: string }) => code.code.toLowerCase() === discountCode.toLowerCase());

      if (foundCode) {
        setAppliedDiscount(foundCode.discount);
        setDiscountCode("");
      } else {
        setDiscountError("Nieprawidłowy kod rabatowy");
        setAppliedDiscount(0);
      }
    } catch {
      setDiscountError("Błąd podczas weryfikacji kodu");
      setAppliedDiscount(0);
    } finally {
      setIsSubmittingDiscount(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!isTermsAccepted) {
      alert("Proszę zaakceptować regulamin");
      return;
    }

    try {
      const discountedCartItems = cartItems.map(item => ({
        id: item._id,
        quantity: item.quantity,
        price: Number((item.price * (1 - appliedDiscount / 100)).toFixed(2))
      }));

      const paymentData = {
        cartItems: discountedCartItems,
        email: data.email,
        nameAndSurname: data.nameAndSurname,
        companyName: data.isCompany ? data.companyName : "",
        nip: data.isCompany ? data.nip : "",
        appliedDiscount,
        totalPrice: Number(finalPrice.toFixed(2)),
        originalPrice: totalPrice,
        discountInfo: appliedDiscount > 0 ? {
          discountPercentage: appliedDiscount,
          amountSaved: Number((totalPrice - finalPrice).toFixed(2))
        } : null
      };

      const { data: paymentResponse } = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/przelewy24`, paymentData);

      if (paymentResponse?.url) {
        window.location.href = paymentResponse.url;
      }
    } catch {
      alert("Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.");
    }
  };

  const handleRemoveFromCart = (item: { _id: string }) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className={`Container ${styles.container}`}>
      <Breadcrumbs />
      <div className={styles.wrapper}>
        <div className={styles.cart}>
          <div className={styles.orderSummary}>
            <h2>PODSUMOWANIE ZAMÓWIENIA:</h2>
            <div className={styles.order}>
              {cartItems.map(item => (
                <div key={item._id} className={styles.orders}>
                  <div className={styles.orderContent}>
                    <div>
                      <h5 className={styles.topText}>{item.title}</h5>
                      <p className={styles.bottomText}>
                        {appliedDiscount > 0 ? (
                          <>
                            <span className={styles.originalPrice}>{item.price} zł</span>
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
                    <button onClick={() => handleRemoveFromCart(item)} className={styles.removeButton}>✕</button>
                  </div>
                </div>
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
                Całkowita należność: <strong>{finalPrice.toFixed(2)}</strong> zł
              </span>
            </div>

            <div className={styles.discountCode}>
              <label htmlFor="discount">Kod rabatowy</label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="discount"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className={discountError ? styles.errorInput : ""}
                />
                <button
                  type="button"
                  onClick={validateDiscountCode}
                  disabled={isSubmittingDiscount}
                  className={styles.discountButton}
                >
                  {isSubmittingDiscount ? "Weryfikacja..." : "Dodaj rabat"}
                </button>
              </div>
              {discountError && <span className={styles.errorText}>{discountError}</span>}
              {appliedDiscount > 0 && <p className={styles.discountApplied}>Rabat {appliedDiscount}% został naliczony</p>}
            </div>
          </div>
        </div>

        <form className={styles.orderFormSecond} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.checkboxContainer}>
            <input type="checkbox" {...register("isCompany")} />
            <span>Zamówienie jako firma</span>
          </label>

          <div className={styles.paymentDetails}>
            <h2>DANE PŁATNOŚCI</h2>
            <label className={styles.label}>
              Imię i nazwisko
              <input type="text" {...register("nameAndSurname", { required: true })} />
              {errors.nameAndSurname && <span className={styles.errorText}>To pole jest wymagane</span>}
            </label>

            <label className={styles.label}>
              Email
              <input type="email" {...register("email", { required: true })} />
              {errors.email && <span className={styles.errorText}>To pole jest wymagane</span>}
            </label>

            {isCompany && (
              <>
                <label className={styles.label}>
                  Nazwa firmy
                  <input type="text" {...register("companyName", { required: true })} />
                  {errors.companyName && <span className={styles.errorText}>To pole jest wymagane</span>}
                </label>
                <label className={styles.label}>
                  NIP
                  <input type="text" {...register("nip", { required: true })} />
                  {errors.nip && <span className={styles.errorText}>To pole jest wymagane</span>}
                </label>
              </>
            )}

            <fieldset className={styles.fieldset}>
              <label>
                <input type="checkbox" {...register("isTermsAccepted", { required: true })} />
                <span>Zapoznałem się z polityką prywatności oraz regulaminem sklepu...</span>
              </label>
              {errors.isTermsAccepted && <span className={styles.errorText}>Akceptacja jest wymagana</span>}
            </fieldset>

            <button className="button" type="submit">
              Kupuję i płacę
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cartpage;
