const express = require('express')
const router = express.Router()
const {authMiddleware, isAdminMiddleware} = require("../middleware/authMiddleware")
const {addCategory, fetchCategory} = require("../controllers/categoryController")

router.post("/", authMiddleware, isAdminMiddleware, addCategory)

router.get("/", authMiddleware, fetchCategory)

module.exports = router;