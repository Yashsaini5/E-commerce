import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`,{withCredentials: true})
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch product", err);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...product.variants];
    newVariants[index][field] = value;
    setProduct({ ...product, variants: newVariants });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/products/${id}`, product,{withCredentials: true})
      .then(() => alert("Product updated successfully"))
      .catch((err) => {
        console.error("Update failed", err);
        alert("Failed to update product");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      {/* Thumbnail Image */}
      <div className="mb-4">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-32 h-32 object-cover rounded border"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Variants:</label>
        {product.variants?.map((variant, index) => (
          <div key={index} className="mb-3 border p-3 rounded bg-gray-50">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Size"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, "option", e.target.value)}
                className="border px-2 py-1 rounded w-1/3"
              />
              <input
                type="number"
                placeholder="Price"
                value={variant.newPrice}
                onChange={(e) => handleVariantChange(index, "newPrice", e.target.value)}
                className="border px-2 py-1 rounded w-1/3"
              />
              <input
                type="number"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                className="border px-2 py-1 rounded w-1/3"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProduct;
