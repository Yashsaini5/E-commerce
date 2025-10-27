import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ItemList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

    const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(apiUrl + "/api/products",{withCredentials: true})
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Unexpected response:", res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    axios
      .delete(apiUrl + `/api/products/${productId}`, {
        withCredentials: true,
      })
      .then(() => {
        // Remove deleted product from UI without refetching all
        setProducts((prev) => prev.filter((p) => p._id !== productId));
      })
      .catch((err) => {
        console.error("Failed to delete product", err);
        alert("Failed to delete product. Try again later.");
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Brand</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4">{product.brand || "N/A"}</td>
                  <td className="px-6 py-4">
                    {product.category?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center space-y-2">
                      <Link
                        to={`/admin/products/${product._id}`}
                        className="w-20 px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition text-center"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="w-20 px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition text-center"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemList;
