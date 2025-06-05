const express = require("express")
const {authMiddleware} = require("../middleware/authMiddleware")
const router = express.Router();
const {addingToCart, fetchingCart, cartItemUpdatation, cartItemDeletion} = require("../controllers/cartController")

router.post("/cart", authMiddleware, addingToCart)

router.get("/cart",authMiddleware, fetchingCart)

router.patch("/cart/update",authMiddleware, cartItemUpdatation)

router.delete(`/cart/remove`,authMiddleware, cartItemDeletion)

module.exports = router