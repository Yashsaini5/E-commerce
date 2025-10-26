const Product = require("../models/product");
const category = require("../models/category");
const mongoose = require("mongoose");
const cloudinary_js_config = require("../config/cloudinaryConfig")

const productCreation = async (req, res) => {
  // console.log("Uploaded files:", req.files);
    try{
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded" });
          }      
  const {
    name,
    description,
    category,
    subcategory,
    brand,
    specifications,
    variants,
  } = req.body;

  // Convert JSON string to an object (since formData sends objects as strings)
  const parsedSpecifications = specifications ? JSON.parse(specifications) : [];
  const parsedVariants = variants ? JSON.parse(variants) : [];
//   console.log(parsedSpecifications, parsedVariants);
  

//   console.log(req.files)
const uploadedImages = [];
for (const file of req.files) {
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary_js_config.uploader.upload_stream(
      { folder: "ecommerce" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(file.buffer);
  });

  uploadedImages.push(result.secure_url);
}


  // const imagePaths = req.files.map(
  //   (file) => `http://localhost:5000/images/uploads/${file.filename}`
  // );

  const createdProduct = await Product.create({
    name,
    description,
    images: uploadedImages,
    category,
    subCategory: subcategory,
    brand,
    specifications: parsedSpecifications,  // Array of { key: "", value: "" }
    variants: parsedVariants, // Array of { size: "", oldPrice: "", newPrice: "", stock: "" }
  });
  // console.log("Created Product:", createdProduct); 
  res.send(createdProduct);
  // console.log('product created')
}catch(error){
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
}

const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category","name subcategories sizeOptions");
    res.json(products);
    // res.send(products)
    // console.log(products)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const filteredProducts = async (req, res) => {
  try {

    let filters = {};

    // 1) Resolve category name to ObjectId
    if (req.query.category) {
      // console.log("Category requested:", req.query.category);
      const categoryDoc = await category.findOne({ name: req.query.category });
      if (!categoryDoc) {
        return res.status(404).json({ error: "Category not found" });
      }
      filters.category = categoryDoc._id;
    }

    // 2) Price filter on variants.newPrice
    if (req.query.maxPrice) {
      const maxPrice = Number(req.query.maxPrice);
      filters["variants.newPrice"] = { $lte: maxPrice };
    }

    // 3) Query products with filters
    const products = await Product.find(filters).populate("category", "name");

    // console.log("Filtered products count:", products.length);

    res.json(products);
  } catch (err) {
    console.error("Filter route error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

const productById = async (req, res) => {
  const { id } = req.params;
  
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(req.params.id).populate('category');
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
}

const updateProductById = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
}

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', deletedProduct });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
}

module.exports = {productCreation, fetchAllProducts, filteredProducts, productById, updateProductById, deleteProductById}