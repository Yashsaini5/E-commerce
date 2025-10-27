import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { useNavigate, useLocation } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, user, fetchWishlist, addToCart, removeFromWishlist } =
    useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  // if (!user) {
  //   return <div>Loading...</div>; // Fallback UI
  // }
  useEffect(() => {
    if (user == null) {
      localStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/login", { replace: true });
    } else {
      fetchWishlist(user);
    }
  }, [user, navigate]);

  // console.log("wishlist", wishlist)
  if (!user || user == null) return null;

  return (
    <>
      {user && (
        <div>
          <div className="h-16"></div>
          <div className="h-[90.7vh] py-12 px-10">
            <p className="text-2xl  h-12 font-semibold mb-12 border-b-4 border-gray-500">
              MY WISHLIST
            </p>
            <div className="flex">
              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[70vh] text-center bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl shadow-inner mx-6">
                  <i className="ri-heart-line text-7xl text-gray-400 mb-4"></i>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Your Wishlist is Empty
                  </h2>
                  <p className="text-gray-500 max-w-md mb-6">
                    Looks like you haven’t added anything to your wishlist yet.
                    Start exploring and add items you love!
                  </p>
                  <a
                    href="/"
                    className="px-8 py-3 bg-red-500 text-white rounded-full font-medium shadow-md hover:bg-red-600 transition-all duration-300"
                  >
                    Browse Products
                  </a>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-400 w-1/5 h-[65vh] cursor-pointer flex flex-col mr-14"
                  >
                    <div className="w-full h-2/3 bg-red-600 overflow-hidden border-b border-gray-400 relative ">
                      <Link to={`/product/${item.product?._id}`}>
                        {item.product && item.product.images ? (
                          <img
                            src={item.product.images[0]}
                            alt=""
                            className="object-cover object-top h-full w-full hover:scale-105"
                          ></img>
                        ) : (
                          <p>no images</p>
                        )}
                      </Link>
                    </div>
                    {/* {console.log(item)} */}
                    <div className="h-24 w-full p-2 flex flex-col">
                      <Link to={`/product/${item.product?._id}`}>
                        <div className="text-lg font-medium hover:underline">
                          {item.product.name.length > 29
                            ? item.product.name.toString().substring(0, 29) +
                              "..."
                            : item.product.name}
                        </div>
                      </Link>
                      <div className="flex gap-2 mt-1">
                        <div className="text-lg font-semibold">
                          Rs.{item.product?.variants[0]?.newPrice}
                        </div>
                        <div className="text-xs line-through text-gray-600 mt-2">
                          Rs.{item.product.variants[0]?.oldPrice}
                        </div>
                        <div className="text-sm text-orange-500 mt-1">
                          {Math.floor(
                            ((item.product.variants[0].oldPrice -
                              item.product.variants[0].newPrice) /
                              item.product.variants[0].oldPrice) *
                              100
                          )}
                          % off
                        </div>
                      </div>
                    </div>
                    <div
                      className="h-14 w-full border-t border-gray-400 flex justify-center items-center text-pink-600 font-extrabold text-sm hover:bg-pink-600 hover:text-white"
                      onClick={() => removeFromWishlist(item.product._id)}
                    >
                      REMOVE
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
