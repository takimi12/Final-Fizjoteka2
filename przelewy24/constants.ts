// const API_URL='https://sandbox.przelewy24.pl'

// const POS_ID=303306
// const CRC="d6cfd7c99d6a21f6"
// const API_KEY="ab5592ef8267599515dad8d635afae29"

// export const getTransactionIdFromPrzelewy24=async ()=>{
//     const response=await fetch(`${API_URL}/api/v1/transaction/register`,{
//         method: "POST",
//         body: JSON.stringify({
//   "merchantId": POS_ID,
//   "posId": POS_ID,
//   "sessionId": "test123", 
//   "amount": 2137,
//   "currency": "PLN",
//   "description": "jakis opis transkacji",
//   "email": "tomek12olech@gmail.com",
//   "client": "Tomasz Olech",
//   "address": "Dworcowa 3/5",
//   "zip": "42-500",
//   "city": "Katowice",
//   "country": "PL",
//   "language": "pl",
//   "method": 114,
//   "urlReturn": "http://localhost:3000/cart/success",
//   "timeLimit": 0,
//   "channel": 16,
//   "waitForResult": true,
//   "regulationAccept": false,
//   "shipping": 0,
//   "transferLabel": "Nazwa produktu",
//   "sign": "0bf2ca4da66fdb34990a7b452b285e68f5a0e0e2d64d810473124eedb4ce85708040b49480c83ad7e57774a0eb526742", //{"sessionId":"test123","merchantId":0,"amount":2137,"currency":"PLN","crc":"d6cfd7c99d6a21f6"} sha384
//   "cart": [
//     {
//       "sellerId": "1",
//       "sellerCategory": "ebooki",
//       "name": "E-book nazwa",
//       "quantity": 1,
//       "price": 100,
//     }
//   ],
// })
//     })
//     return response;
// }