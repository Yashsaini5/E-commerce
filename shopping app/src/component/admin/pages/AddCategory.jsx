import { useState, useEffect } from "react";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState([""]);
  const [sizes, setSizes] = useState([""]);
  const [categories, setCategories] = useState([]);

  // Fetchs categories on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories", { withCredentials: "true" })
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Add new subcategory input field
  const addSubcategoryField = () => {
    setSubcategories([...subcategories, ""]);
  };

  // Update subcategory input value
  const updateSubcategory = (index, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index] = value;
    setSubcategories(updatedSubcategories);
  };

  // Add new size input field
  const addSizeField = () => {
    setSizes([...sizes, ""]);
  };

  // Update size input value
  const updateSize = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = value;
    setSizes(updatedSizes);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        {
          name,
          subcategories: subcategories.filter((sub) => sub.trim() !== ""), // Remove empty subcategories
          sizes: sizes.filter((size) => size.trim() !== ""), // Remove empty sizes
        },
        { withCredentials: "true" }
      );
      alert(response.data.message);
      setName("");
      setSubcategories([""]);
      setSizes([""]); 
      setCategories([...categories, response.data.category]);
    } catch (error) {
      console.error("Error adding category:", error);
      alert(error.response?.data?.message || "Error adding category");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Add Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        <h4 className="text-lg font-semibold text-gray-600">Subcategories</h4>

        {subcategories.map((sub, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Subcategory"
              value={sub}
              onChange={(e) => updateSubcategory(index, e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSubcategoryField}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          + Add Subcategory
        </button>

        <h4 className="text-lg font-semibold text-gray-600 mt-4">Sizes</h4>

        {sizes.map((size, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Size (e.g. S, M, L or 128GB, 256GB)"
              value={size}
              onChange={(e) => updateSize(index, e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSizeField}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
        >
          + Add Size
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Category
        </button>
      </form>

      <h3 className="text-lg font-semibold text-gray-700 mt-6">
        Existing Categories
      </h3>
      <ul className="mt-2 space-y-2">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="p-3 border rounded-md bg-gray-100 text-gray-700"
          >
            <span className="font-semibold">{cat.name}</span> -
            <span> Subcategories: {cat.subcategories.join(", ")}</span> -
            <span> Sizes: {cat.sizes ? cat.sizes.join(", ") : "N/A"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCategory;
