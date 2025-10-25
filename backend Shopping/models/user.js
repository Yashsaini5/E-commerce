const mongoose = require("mongoose");
const product = require("./product");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, },
  email: { type: String, required: true, unique: true, trim: true, },
  password: { type: String, default: null },
  authProvider: { type: String, default: "local" }, // local or firebase
  firebaseUid: String,
  addresses: [{
  firstName: String,
  lastName: String,
  phone: Number,
  street: String,
  city: String,
  state: String,
  zipcode: Number,
  country: String
}],
  cart: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Reference to the Product
      variant: {
        size: String, // Selected size (Example: "M" or "128GB")
        newPrice: Number, // Price of the selected variant
        oldPrice: Number,
      },
      quantity: { type: Number, default: 1 },
    },],
  wishlist: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" } },],
  role: { type: String, enum: ["customer", "admin"], default: "customer",},
  createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model("user", UserSchema);