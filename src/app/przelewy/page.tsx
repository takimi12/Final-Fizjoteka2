"use client";
import axios from 'axios';
import { getTransactionIdFromPrzelewy24 } from '../../../przelewy24/constants';

const Page = () => {

const handlePayment = async () => {
  console.log("handle payment start")
  try {
    // const response = await axios.post('http://localhost:3000/api/createPayment', {
    //   amount: parseInt(amount) * 100, // amount in cents
    //   description,
    //   email,
    // });
    const response=await getTransactionIdFromPrzelewy24()
    const data=await response.json()
    console.log("przelewy24 data", data)
    // if (data && data.data && data.data.token) {
    //   window.location.href = `https://sandbox.przelewy24.pl/trnRequest/${data.data.token}`;
    // }
  } catch (error) {
    console.error(error);
  }
};

return (
    <>
        <button className={`button`} onClick={handlePayment}>Kupuję i płacę</button>
</>

);
};

export default Page;