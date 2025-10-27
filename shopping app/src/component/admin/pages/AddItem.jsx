import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const MAX_IMAGES = 5;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    subcategory: "",
    images: Array(MAX_IMAGES).fill(null),
    preview: Array(MAX_IMAGES).fill(null),
    specifications: [],
    variants: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

    const apiUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    axios
      .get(apiUrl + "/api/categories", { withCredentials: true })
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData({ ...formData, category: selectedCategory, subcategory: "" });

    const categoryData = categories.find((cat) => cat._id === selectedCategory);

    if (categoryData) {
      setSubcategories(categoryData.subcategories || []);
      setSizeOptions(categoryData.sizes || []);
    } else {
      setSubcategories([]);
      setSizeOptions([]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files); // Get all selected files

    if (!files.length) return;

    setFormData((prevFormData) => {
      const updatedImages = [...prevFormData.images];
      const updatedPreview = [...prevFormData.preview];

      // Insert new images at the correct position, replacing if necessary
      files.forEach((file, i) => {
        const newIndex = index + i; // Adjust index for multiple images
        updatedImages[newIndex] = file;
        updatedPreview[newIndex] = URL.createObjectURL(file);
      });

      return {
        ...prevFormData,
        images: updatedImages,
        preview: updatedPreview,
      };
    });
  };

  const handleAddSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: "", value: "" }],
    });
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs[index][field] = value;
    setFormData({ ...formData, specifications: updatedSpecs });
  };

  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { size: "", oldPrice: "", newPrice: "", stock: "" },
      ],
    });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log("Form Data Submitted:", formData);

    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("subcategory", formData.subcategory);

    // Convert specifications and variants to JSON string
    formDataToSend.append(
      "specifications",
      JSON.stringify(formData.specifications)
    );
    formDataToSend.append("variants", JSON.stringify(formData.variants));

    // Append images
    formData.images.forEach((file, i) => {
      if (file) {
        formDataToSend.append(`images`, file);
        // console.log(`Appending image ${i}:`, file.name);
      }
    });

    try {
      const response = await axios.post(
        apiUrl + "/api/products/add",
        formDataToSend, 
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data)

      setFormData({
        name: "",
        description: "",
        category: "",
        subCategory: "",
        brand: "",
        images: Array(MAX_IMAGES).fill(null),
        preview: Array(MAX_IMAGES).fill(null),
        specifications: [],
        variants: [],
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="imageSection text-black font-semibold text-lg mb-4">
          Upload Image
          <div className="flex gap-2 mt-3">
            {formData.preview?.map((_, index) => (
              <div
                className="h-24 w-24 bg-slate-500 flex flex-col items-center justify-center relative text-neutral-800"
                key={index}
              >
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, index)}
                  className="h-full w-full opacity-0 absolute"
                />
                {formData.preview[index] ? (
                  <img
                    src={formData.preview[index]}
                    alt=""
                    className="h-full w-full"
                  />
                ) : (
                  <div>
                    <i className="ri-upload-cloud-2-line text-4xl font-thin"></i>
                    <p className="font-light text-sm">Upload</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        ></textarea>
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />

        <div className="flex gap-2 mb-2 items-center">
          <select
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            className="border p-2 w-[87%]"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => navigate("/admin/addCategory")}
            className="bg-green-500 text-white p-2"
          >
            + Add Category
          </button>
        </div>

        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Subcategory</option>
          {subcategories?.map((sub, index) => (
            <option key={index} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <h3 className="font-bold mt-4">Product Specifications</h3>
        {formData?.specifications?.map((spec, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Key"
              value={spec.key}
              onChange={(e) =>
                handleSpecificationChange(index, "key", e.target.value)
              }
              className="border p-2 w-1/2"
            />
            <input
              type="text"
              placeholder="Value"
              value={spec.value}
              onChange={(e) =>
                handleSpecificationChange(index, "value", e.target.value)
              }
              className="border p-2 w-1/2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSpecification}
          className="bg-blue-500 text-white p-2"
        >
          + Add Specification
        </button>

        <h3 className="font-bold mt-4">Variants</h3>
        {formData?.variants?.map((variant, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              value={variant.size}
              onChange={(e) =>
                handleVariantChange(index, "size", e.target.value)
              }
              className="border p-2 w-1/4"
            >
              <option value="">Select Size</option>
              {sizeOptions.map((size, idx) => (
                <option key={idx} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Old Price"
              value={variant.oldPrice}
              onChange={(e) =>
                handleVariantChange(index, "oldPrice", e.target.value)
              }
              className="border p-2 w-1/4"
            />
            <input
              type="number"
              placeholder="New Price"
              value={variant.newPrice}
              onChange={(e) =>
                handleVariantChange(index, "newPrice", e.target.value)
              }
              className="border p-2 w-1/4"
            />
            <input
              type="number"
              placeholder="Stock"
              value={variant.stock}
              onChange={(e) =>
                handleVariantChange(index, "stock", e.target.value)
              }
              className="border p-2 w-1/4"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddVariant}
          className="bg-blue-500 text-white p-2 mt-2"
        >
          + Add Variant
        </button>

        <button
          type="submit" disabled={isSubmitting}
          className={`p-2 mt-4 block w-full text-white transition-colors duration-300 rounded
          ${isSubmitting ? "bg-purple-300 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"}
        `}
        >
           {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
