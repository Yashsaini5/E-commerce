const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
        size: String, // e.g., "M" or "128GB"
        price: Number,
      name: String,
      image: String,
    },
  ],

  shippingAddress: {
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number,
    country: String,
    phone: Number,
  },

  paymentDetails: {
    method: { type: String, enum: ["Stripe", "Razorpay", "COD"], required: true },
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    transactionId: { type: String },
  },

  totalAmount: { type: Number, required: true },

  status: {
    type: String,
    enum: ["Order Placed", "Packing", "Shipped", "Out For Delivery", "Delivered", "Cancelled"],
    default: "Pending",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
