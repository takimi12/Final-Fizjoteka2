// "use client";
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart, removeFromCart,selectTotalPrice } from '../../Redux/Cartslice';
// import Breadcrumbs from '@/components/breadcrumbs/page';
// import styles from "./koszyk.module.scss"
// import axios from 'axios';

// import {
//   P24,
//   Order,
//   Currency,
//   Country,
//   Language,
//   NotificationRequest,
//   Verification
// } from "@ingameltd/node-przelewy24";

// const Cartpage = () => {
// const dispatch = useDispatch();
// const cartItems = useSelector((state) => state.cart);
// const [isCompany, setIsCompany] = useState(false);
// const totalPrice = useSelector(selectTotalPrice);

// const [amount, setAmount] = useState('');
// const [description, setDescription] = useState('');
// const [email, setEmail] = useState('');

// const handlePayment = async () => {
//   const POS_ID=303306
// const CRC="d6cfd7c99d6a21f6"
// const API_KEY="ab5592ef8267599515dad8d635afae29"
//   const p24 = new P24(
//   POS_ID, 
//   POS_ID,
//   API_KEY,
//   CRC, 
//   { 
//     sandbox: true // enable or disable sandbox
//   }
// );
// const result = await p24.createTransaction({
//   sessionId: "c837e1a3-c5a3-4e89-adf1-05faffd8913b",
//   amount: 1000, // Transaction amount expressed in lowest currency unit, e.g. 1.23 PLN = 123
//   currency: Currency.PLN,
//   description: "test order",
//   email: "john.doe@example.com",
//   country: Country.Poland,
//   language: Language.PL,
//   urlReturn: "http://myawesomeapp.com/continue",
//   urlStatus: "http://myawesomeapp.com/p24callback", // callback to get notification
//   timeLimit: 15, // 15min
//   encoding:"UTF-8",
// })
// console.log(result);

//   console.log("handle payment start")
//   try {
//     // const response = await axios.post('http://localhost:3000/api/createPayment', {
//     //   amount: parseInt(amount) * 100, // amount in cents
//     //   description,
//     //   email,
//     // });
//     // const response=await getTransactionIdFromPrzelewy24()
//     // const data=await response.json()
//     // console.log("przelewy24 data", data)
//     // if (data && data.data && data.data.token) {
//     //   window.location.href = `https://sandbox.przelewy24.pl/trnRequest/${data.data.token}`;
//     // }
//   } catch (error) {
//     console.error(error);
//   }
// };



// const handleRemoveFromCart = (item) => {
//     dispatch(removeFromCart(item));
// };

// return (
//     <>

//  <Breadcrumbs />


// <div className={`Container m-auto flex`}>
//    <div className={` ${styles.cart}`}>
//    <div className={styles.orderSummary}>
//       <h2>PODSUMOWANIE ZAMÓWIENIA:</h2>
//       <div className={styles.order}>
// {cartItems.map((item) => (
//     <>
//     <div key={item.id} className={styles.orders} >
//             <div >
//                 <div>
//         <h5 className={styles.topText} >{item.title}</h5>
//       <p className={styles.bottomText} >{item.price} zł <span className={styles.normalFont}>(zawiera vat)</span></p>
//       </div>
//         </div>

//     </div>
//   </>
//   ))}
//       </div>

//       <div className={styles.totalAmount}>
//       <span>Całkowita należność: {totalPrice > 0 ? <strong>{totalPrice.toFixed(2)}</strong> : '0'}</span>
//       </div>
    

//       <div className={styles.discountCode}>
//         <label htmlFor="discount">Kod rabatowy</label>
//         <div className={styles.inputContainer}>
//           <input type="text" id="discount" name="discount" />
//           <button type="button">Dodaj rabat</button>
//         </div>
//       </div>
//     </div>
 

//   </div>
//   <div className={styles.orderFormSecond}>
//       <label className={styles.checkboxContainer}>
//         <input
//           type="checkbox"
//           checked={isCompany}
//           onChange={() => setIsCompany(!isCompany)}
//         />
//         <span>Zamówienie jako firma</span>
//       </label>

//       <div className={styles.paymentDetails}>
//         <h2>DANE PŁATNOŚCI</h2>
//         <label className={styles.label}>
//           Imię i nazwisko
//           <input type="text" />
//         </label>
//         <label className={styles.label}>
//           Email
//           <input type="email" />
//         </label>
//         {isCompany && (
//           <>
//             <label className={styles.label}>
//               Nazwa firmy
//               <input type="text" />
//             </label>
//             <label className={styles.label}>
//               NIP
//               <input type="text" />
//             </label>
//           </>
//         )}
//         <label className={styles.checkboxContainer}>
//           <input className={styles.input} type="checkbox" required />
//           <span>
//             Zapoznałem się z polityką prywatności oraz regulaminem sklepu. Dobrowolnie zrzekam się z prawa do odstąpienia od produktu w terminie 14 dni od zakupu - Wymagane
//           </span>
//         </label>
//         <button className={`button`} onClick={handlePayment}>Kupuję i płacę</button>
//       </div>
//     </div>
//     </div>


// </>

// );
// };

// export default Cartpage;