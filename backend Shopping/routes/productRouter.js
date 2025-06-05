const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../multer");
const {authMiddleware, isAdminMiddleware} = require("../middleware/authMiddleware")
const {productCreation, fetchAllProducts, filteredProducts, productById, updateProductById, deleteProductById} = require("../controllers/productController")

//create product
router.post("/add",authMiddleware, isAdminMiddleware, upload.array("images", 5), productCreation);

// get all products
router.get("/", fetchAllProducts);

//applying filters 
router.get("/filter", filteredProducts);

// product by ID
router.get("/:id", productById);

// update product
router.put("/:id" ,authMiddleware, isAdminMiddleware, updateProductById);

// delete product
router.delete('/:id' ,authMiddleware, isAdminMiddleware, deleteProductById);

module.exports = router;
