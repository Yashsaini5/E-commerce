import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

const ProductList = () => {
  const { data, addToWishlist, removeFromWishlist, wishlist, fetchWishlist } =
    useContext(DataContext);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLiked, setIsLiked] = useState(null);
  const [filters, setFilters] = useState({
    brand: [],
    size: [],
    subcategory: [],
    minPrice: "",
    maxPrice: "",
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [showAllSubcategories, setShowAllSubcategories] = useState(false);
  const subcategoryLimit = 5;
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 28;

  const uniqueBrand = [...new Set(searchedProducts?.map((p) => p.brand))];
  const uniqueSizes = [
    ...new Set(searchedProducts?.flatMap((p) => p.variants.map((v) => v.size))),
  ];
  const uniqueSubcategories = [
    ...new Set(searchedProducts?.map((p) => p.subCategory)),
  ];
  const allPrices = searchedProducts?.flatMap((p) =>
    p.variants.map((v) => v.newPrice)
  );
  const minPrice = allPrices?.length ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices?.length ? Math.max(...allPrices) : 0;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    if (query) {
      let results = data?.filter((product) => {
        return (
          product.category.name?.toLowerCase().includes(query.toLowerCase()) ||
          product.subCategory?.toLowerCase().includes(query.toLowerCase()) ||
          product.name?.toLowerCase().includes(query.toLowerCase())
        );
      });
      console.log(results);
      setSearchedProducts(results);
      setFilteredProducts(results);

      // Apply filters
      let filteredResults = results;
      if (filters) {
        filteredResults =
          results?.filter((product) => {
            return (
              (!filters.brand.length ||
                filters.brand.includes(product.brand)) &&
              (!filters.size.length ||
                product.variants.some((variant) =>
                  filters.size.includes(variant.size)
                )) &&
              (!filters.subcategory.length ||
                filters.subcategory.includes(product.subCategory)) &&
              (!filters.minPrice ||
                product.variants.some(
                  (variant) => variant.newPrice >= filters.minPrice
                )) &&
              (!filters.maxPrice ||
                product.variants.some(
                  (variant) => variant.newPrice <= filters.maxPrice
                ))
            );
          }) || [];
        // setFilteredProducts(filteredResults)
      }

      // Apply sorting logic
      let sortedResults = Array.isArray(filteredResults)
        ? [...filteredResults]
        : []; // Copy array before sorting
      if (sortBy === "price_low_to_high") {
        sortedResults.sort(
          (a, b) => a.variants[0]?.newPrice - b.variants[0]?.newPrice
        );
      } else if (sortBy === "price_high_to_low") {
        sortedResults.sort(
          (a, b) => b.variants[0]?.newPrice - a.variants[0]?.newPrice
        );
      }
      // If "relevance", keep default order (no sorting)

      setFilteredProducts(sortedResults);
    } else {
      setFilteredProducts(data);
      setSearchedProducts(data);
    }
  }, [query, data, filters, sortBy]);

  useEffect(() => {
    if (query)
      setFilters({
        brand: [],
        size: [],
        subcategory: [],
        minPrice: "",
        maxPrice: "",
      });
  }, [query]);
  useEffect(() => {
    fetchWishlist();
  }, []);
  useEffect(() => {
    if (Array.isArray(wishlist)) {
      setIsLiked(
        wishlist.some((item) => item.product?._id === filteredProducts?._id)
      );
    }
  }, [wishlist, filteredProducts]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      // Ensure the current filter is treated as an array
      const currentFilter = Array.isArray(prev[filterType])
        ? prev[filterType]
        : [];

      return {
        ...prev,
        [filterType]: currentFilter.includes(value)
          ? currentFilter.filter((item) => item !== value) // Remove if already selected
          : [...currentFilter, value], // Add if not selected
      };
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleWishlist = async () => {
    if (isLiked) {
      await removeFromWishlist(product._id);
    } else if (!wishlist.some((item) => item.product._id === product._id)) {
      await addToWishlist(product._id);
    }
    await fetchWishlist();
  };
  // console.log(filteredProducts)
  const toalItemCount = searchedProducts?.length;

  return (
    <>
      <div className="h-16"></div>
      <div className="h-full w-full bg-gray-300">
        <div className="flex">
          <p className="text-lg font-normal pt-4 pb-2 pl-6">
            Search Results for
          </p>
          {/* {console.log(filteredProducts)} */}
          <p className="text-lg font-semibold pt-4 pb-2 pl-1"> {query}</p>
          <p className="text-lg font-normal pt-4 pb-2 pl-1 text-gray-600">
            - {toalItemCount} items
          </p>
        </div>
        <div className="belowNavbar flex h-full flex-col lg:flex-row w-full px-4 gap-2">
          <div className="sidebar w-full sm:w-1/3 lg:w-1/6 bg-white flex flex-col mr-0 lg:mr-2 text-slate-600 shadow-xl rounded-md mb-4 lg:mb-0 ">
            <div className="flex justify-between items-center h-14 px-4 py-3 border-b border-gray-400">
              <p className="text-xl font-semibold text-black">Filters</p>
              <button
                onClick={() => {
                  setFilters({
                    brand: [],
                    size: [],
                    subcategory: [],
                    minPrice: "",
                    maxPrice: "",
                  });
                }}
                className="text-sm font-medium text-pink-500"
              >
                CLEAR ALL
              </button>
            </div>

            <div className="p-4">
              <p className="text-black font-medium text-base mb-2">BRAND</p>
              {(showAllBrands ? uniqueBrand : uniqueBrand.slice(0, 5)).map(
                (brand) => (
                  <div key={brand} className="flex flex-col">
                    <div className="flex pl-2 items-center">
                      <input
                        type="checkbox"
                        checked={filters.brand.includes(brand)}
                        id={brand}
                        className="w-4 h-4 accent-pink-500 text-sm bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                        onChange={() => handleFilterChange("brand", brand)}
                      />
                      <label htmlFor={brand} className="pl-2">
                        {brand.toUpperCase()}
                      </label>
                    </div>
                  </div>
                )
              )}
              {uniqueBrand.length > 5 && (
                <button
                  onClick={() => setShowAllBrands(!showAllBrands)}
                  className="text-sm text-pink-500 font-medium ml-2 mt-2"
                >
                  {showAllBrands ? (
                    <>
                      Show Less <span>&#9650;</span>
                    </>
                  ) : (
                    <>
                      Show More <span>&#9660;</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="p-4">
              <p className="text-black font-medium text-base mb-2">
                SUB-CATEGORY
              </p>
              {(showAllSubcategories
                ? uniqueSubcategories
                : uniqueSubcategories.slice(0, subcategoryLimit)
              ).map((subcategory) => (
                <div key={subcategory} className="flex flex-col">
                  <div className="flex pl-2 items-center">
                    <input
                      type="checkbox"
                      checked={filters.subcategory.includes(subcategory)}
                      id={subcategory}
                      className="w-4 h-4 accent-pink-500 text-sm bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                      onChange={() =>
                        handleFilterChange("subcategory", subcategory)
                      }
                    />
                    <label htmlFor={subcategory} className="pl-2">
                      {subcategory.toUpperCase()}
                    </label>
                  </div>
                </div>
              ))}
              {uniqueSubcategories.length > subcategoryLimit && (
                <button
                  onClick={() => setShowAllSubcategories(!showAllSubcategories)}
                  className="text-sm font-medium text-pink-500 mt-2 ml-2"
                >
                  {showAllSubcategories ? (
                    <>
                      Show Less <span>&#9650;</span>
                    </>
                  ) : (
                    <>
                      Show More <span>&#9660;</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="p-4">
              <p className="text-black font-medium text-base mb-2">SIZES</p>
              {uniqueSizes?.map((size) => (
                <div key={size} className="flex flex-col">
                  <div className="flex pl-2 items-center">
                    <input
                      type="checkbox"
                      checked={filters.size.includes(size)}
                      id={size}
                      className="w-4 h-4 accent-pink-500 text-sm bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                      onChange={() => handleFilterChange("size", size)}
                    />
                    <label htmlFor={size} className="pl-2">
                      {size.toUpperCase()}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4">
              <p className="text-black font-medium text-base mb-2">
                PRICE RANGE
              </p>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={filters.maxPrice || maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: Number(e.target.value) })
                }
                className="w-full accent-pink-500"
              />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  min={minPrice}
                  max={maxPrice}
                  placeholder={`Min (${minPrice})`}
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, minPrice: Number(e.target.value) })
                  }
                  className="w-24 p-1 border border-gray-300 rounded"
                />
                <span> - </span>
                <input
                  type="number"
                  min={minPrice}
                  max={maxPrice}
                  placeholder={`Max (${maxPrice})`}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: Number(e.target.value) })
                  }
                  className="w-24 p-1 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="main w-5/6 bg-white flex flex-col shadow-xl">
            <div className="flex justify-between items-center h-14 px-3 border-b border-gray-400">
              <p className="text-xl font-semibold text-black">Products</p>
              <select
                className="text-sm font-normal text-gray-600 border border-gray-500 w-48 pl-2 py-1"
                onChange={handleSortChange}
              >
                <option value="Relevance">Sort by: Relevance</option>
                <option value="price_low_to_high">
                  Sort by: price low to high
                </option>
                <option value="price_high_to_low">
                  Sort by: price high to low
                </option>
              </select>
            </div>
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              {filteredProducts?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
                  {currentItems?.map((product) => (
                    <div
                      key={product._id}
                      className="h-[54vh] cursor-pointer flex flex-col rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white"
                    >
                      <div className="w-full h-64 overflow-hidden border-b border-gray-400 relative flex items-center justify-center">
                        {product && product.images ? (
                          <div className="w-full h-full relative">
                            <div
                              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl z-10"
                              onClick={handleWishlist}
                            >
                              <i
                                className={`ri-heart-fill ${
                                  isLiked ? "text-red-800" : ""
                                } cursor-pointer`}
                              ></i>
                            </div>
                            <Link to={`/product/${product._id}`}>
                              <img
                                src={product.images[0]}
                                alt=""
                                className="h-64 w-full object-contain transition-transform duration-300 hover:scale-105"
                              />
                            </Link>
                          </div>
                        ) : (
                          <p>No images</p>
                        )}
                      </div>
                      <div className="p-3 flex flex-col justify-between">
                        <div className="text-sm font-medium text-gray-500">
                          {product.brand}
                        </div>
                        <Link to={`/product/${product._id}`}>
                          <div className="text-sm font-semibold text-gray-800 line-clamp-2 hover:underline">
                            {product.name.length > 60
                              ? product.name.toString().substring(0, 60) + "..."
                              : product.name}
                          </div>
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-base font-bold text-pink-600">
                            Rs.{product.variants[0]?.newPrice}
                          </div>
                          <div className="text-xs line-through mt-1 text-gray-400">
                            Rs.{product.variants[0]?.oldPrice}
                          </div>
                          <div className="text-xs text-green-600 font-semibold">
                            {Math.floor(
                              ((product.variants[0]?.oldPrice -
                                product.variants[0]?.newPrice) /
                                product.variants[0]?.oldPrice) *
                                100
                            )}{" "}
                            % off
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No products found</p>
              )}
            </div>

            <div className="flex justify-center mt-4 gap-3 pb-14">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-3 py-1 border ${
                  currentPage === 1 ? "text-gray-400" : "text-black"
                } `}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 border ${
                    currentPage === index + 1
                      ? "bg-pink-500 text-white"
                      : "text-black"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-3 py-1 border ${
                  currentPage === totalPages ? "text-gray-400" : "text-black"
                } `}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
