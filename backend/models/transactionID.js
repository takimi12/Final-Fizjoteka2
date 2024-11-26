const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  url: {type: String, required: true}
});

const customerSchema = new Schema({
  email: { type: String, required: true },
  nameAndSurname: { type: String, required: true },
  companyName: { type: String },
  nip: { type: String }
});

const transactionSchema = new Schema({
  status: { type: Boolean, required: true },
  products: [productSchema], // Embedding the Product schema
  customer: customerSchema
});

// mongoose.deleteModel('Transaction');

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;
