// // pages/api/status.js
// import nodemailer from 'nodemailer';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { sessionId, status } = req.body;

//     if (status === 'success') {
//       // Pobierz dane zamówienia na podstawie sessionId
//       const order = await getOrder(sessionId);

//       // Skonfiguruj transport email
//       let transporter = nodemailer.createTransport({
//         host: "smtp.example.com",
//         port: 587,
//         secure: false,
//         auth: {
//           user: 'your_email@example.com',
//           pass: 'your_email_password',
//         },
//       });

//       // Wyślij email z produktem
//       let info = await transporter.sendMail({
//         from: '"Sklep" <your_email@example.com>',
//         to: order.email,
//         subject: "Twój zakup",
//         text: "Dziękujemy za zakupy! Oto twój produkt.",
//         attachments: [
//           {
//             filename: 'produkt.zip',
//             path: 'path/to/produkt.zip',
//           },
//         ],
//       });

//       res.status(200).json({ message: 'Email wysłany' });
//     } else {
//       res.status(400).json({ error: 'Nieudana płatność' });
//     }
//   } else {
//     res.status(405).json({ error: 'Metoda nieobsługiwana' });
//   }
// }

// async function getOrder(sessionId) {
//   // Pobierz dane zamówienia na podstawie sessionId
//   return {
//     email: 'klient@example.com',
//     // Inne dane zamówienia
//   };
// }
