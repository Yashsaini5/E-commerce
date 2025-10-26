const express = require('express') ;
const Stripe = require('stripe');
const Order = require('../models/order');
const User = require('../models/user');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post("/webhook", express.raw({type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try{
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    
    // Extract metadata you passed earlier
    const userId = session.metadata.userID;
    const shippingAddress = JSON.parse(session.metadata.shippingAddress);
    const products = JSON.parse(session.metadata.products);
    const totalAmount = Number(session.metadata.totalAmount);

    // Create and save order (same as your verifyStripe logic)
    const orderProducts = products.map(item => ({
      product: item.productId,
      quantity: item.quantity,
      size: item.size,
      price: item.price,
      name: item.name,
      image: item.image,
    }));

    const newOrder = new Order({
      user: userId,
      products: orderProducts,
      shippingAddress,
      paymentDetails: {
        method: "Stripe",
        status: "paid",
        transactionId: session.payment_intent,
      },
      totalAmount,
      status: "Order Placed",
    });

    await newOrder.save();
    await User.findByIdAndUpdate(userId, { cart: [] });

    console.log("✅ Order saved successfully via webhook");
  }

  // Respond back to Stripe (must return 2xx)
  res.send();

});

module.exports = router;