const Order = require("../models/order");
const User = require("../models/user"); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Stripe = require('stripe') 

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing order using COD method
const placeOrderCOD = async (req, res) => {

    try {
        
        const {products, shippingAddress, totalAmount} = req.body
        const userID = req.user
        // console.log(JSON.stringify(products))

        const orderProducts = products.map(item => ({
            product: item.productId,
            quantity: item.quantity,
            size: item.size,
            price: item.price,
            firstName: item.firstName,
            lastName: item.lastName,
            image: item.image,
            name: item.name
        }))

        const newOrder = new Order({
            user: userID,
            products: orderProducts,
            shippingAddress,
            paymentDetails:{
                method: "COD",
                status: "pending",
            },
            totalAmount: totalAmount,
            status: "Order Placed",
        })
        // console.log(JSON.stringify(newOrder))

        await newOrder.save()

        await User.findByIdAndUpdate(userID, {cart:[]})

        res.status(201).json({message:"Order placed successfully", order: newOrder })

    } catch (err) {
        console.log("error placing cod order", err)
        res.status(500).json({message: "failed to place order"})
    }
}

//placing order using Stripe method
const placeOrderStripe = async (req, res) => {
    try {
      const { products, shippingAddress, totalAmount, paymentMethod } = req.body;
      const userID = req.user;
      const { origin } = req.headers;
  
      const inrAmount = totalAmount + 40;
  
      if (paymentMethod === "Stripe") {
        const session = await stripe.checkout.sessions.create({
          success_url: `${origin}/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/verify?success=false`,
          line_items: [
            {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: `Order for ${products.length} items`,
                },
                unit_amount: inrAmount * 100,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          metadata: {
            userID,
            shippingAddress: JSON.stringify(shippingAddress),
            products: JSON.stringify(products),
            totalAmount: inrAmount,
          },
        });
  
        return res.json({ success: true, url: session.url });
      }
    } catch (err) {
      console.error("Error creating stripe session", err);
      res.status(500).json({ message: "Stripe session failed" });
    }
  };
  
//placing order using Razorpay method
const placeOrderRazorpay = async (req, res) => {

}

// user order data for frontend
const userOrders = async (req, res) => {
try {
    
    const userId = req.user
    // console.log(userId);
    

    const orders = await Order.find({ user: new mongoose.Types.ObjectId(userId) })
    // console.log("order", orders);
    
    res.json({success: true, orders})
} catch (error) {
    res.json({success: false , message: error.message})
}
}

//all orders for admin panel
const allOrderAdmin = async (req, res) => {
 try {
    const orders = await Order.find()
      .populate({ path: "user", select: "username email" }); // Make sure 'User' model has 'username'

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders", details: err.message });
  }
}

// update order status from admin panel
const updateStatus = async (req, res) => {
const { orderId, status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
}

module.exports = {placeOrderCOD, placeOrderStripe, placeOrderRazorpay, userOrders, allOrderAdmin, updateStatus}