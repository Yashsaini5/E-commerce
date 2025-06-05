const Category = require('../models/category')

const addCategory =  async (req, res) => {
    try{
        const { name, subcategories, sizes} = req.body

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
          return res.status(400).json({ message: "Category already exists!" });
        }

        const category = new Category({
            name,
            subcategories: subcategories || [],
            sizes: sizes || [],
        })
        // console.log(category);
        

        await category.save()
        res.status(201).json({message: "category added successfully", category})
    }catch(err){
        res.status(500).json({message:"error adding category", err})
    }
}
const fetchCategory = async (req, res) => {
    try{
        const categories = await Category.find()
        // console.log(categories);
        res.json(categories)
    }catch(err){
        res.status(500).json({message:"error fetching categories", err})
    }
}

module.exports = {addCategory, fetchCategory}