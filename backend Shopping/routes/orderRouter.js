const express = require("express")
const {authMiddleware, isAdminMiddleware} = require("../middleware/authMiddleware")
const {placeOrderCOD, placeOrderStripe, verifyStripe, placeOrderRazorpay, userOrders, allOrderAdmin, updateStatus} = require("../controllers/orderController")
const router = express.Router();

//admin features
router.get("/orderList",authMiddleware, isAdminMiddleware, allOrderAdmin)
router.post("/status",authMiddleware, isAdminMiddleware, updateStatus)

//payment fetures
router.post("/placeOrderCOD",authMiddleware, placeOrderCOD)
router.post("/placeOrderStripe",authMiddleware, placeOrderStripe)
router.post("/placeOrderRazorpay",authMiddleware, placeOrderRazorpay)

//verify payment
router.post("/verifyStripe",authMiddleware, verifyStripe)

router.get("/userOrders", authMiddleware, userOrders)

module.exports = router