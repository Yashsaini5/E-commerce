const express = require("express")
const {authMiddleware} = require("../middleware/authMiddleware")
const router = express.Router()
const {addToWishlist, fetchWishlist, deleteFromWishlist} = require("../controllers/wishlistController")

router.post("/wishlist", authMiddleware, addToWishlist)

router.get("/wishlist", authMiddleware, fetchWishlist)

router.delete("/wishlist/remove", authMiddleware, deleteFromWishlist)

module.exports = router