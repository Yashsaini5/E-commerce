import React, { useState,useContext,useEffect } from "react";
import { DataContext } from "../../context/DataProvider";
import { useParams } from "react-router-dom";
import RelatedProduct from "../productComponents/RelatedProduct";
import { useNavigate } from "react-router-dom";

// const Product = () => {
//   const { id } = useParams();
//   const { data, addToCart, addToWishlist, removeFromWishlist, wishlist, fetchWishlist} = useContext(DataContext);
//   const navigate = useNavigate()
 
//   if (!data) {
//     return <div>Loading...</div>; // Fallback UI
//   }

//   const product = data.find((item) => item._id === id);
//   if (!product)
//     return (
//       <p className="pt-20 pl-5 text-4xl">PRODUCT NOT FOUND - ERROR 404!</p>
//     );
//     // console.log(product)

//     const [mainImg, setMainImg] = useState(null)
//     const [isLiked, setIsLiked] = useState(null);
//     const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

//     useEffect(() => {
//       if (product?.images?.length > 0) {
//         setMainImg(product.images[0]);
//       }
//     }, [product]);

//     useEffect(() => {
//       fetchWishlist()
//     }, [])

//     useEffect(() => {
//       if (Array.isArray(wishlist)) {
//         setIsLiked(wishlist.some((item) =>item.product?._id === product._id));
//       }
//     }, [wishlist, product]);
//     // console.log(isLiked);
    

//     let offer = Math.floor ((product.variants[0].oldPrice-product.variants[0].newPrice)/product.variants[0].oldPrice*100) 
//     const handleWishlist = async () => {
//       if (isLiked) {
//        await removeFromWishlist(product._id);
//       } else if(!wishlist.some((item) => item.product._id === product._id)) {
//         await addToWishlist(product._id);
//       }
//       await fetchWishlist()
//     };
const Product = () => {
  const { id } = useParams();
  const {
    data,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    wishlist,
    fetchWishlist,
  } = useContext(DataContext);
  const navigate = useNavigate();

  const [mainImg, setMainImg] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (data?.length > 0) {
      const product = data.find((item) => item._id === id);
      if (product) {
        setMainImg(product.images?.[0] || null);
        setSelectedVariant(product.variants?.[0] || null);
      }
    }
  }, [data, id]);

  // ✅ Load wishlist
  useEffect(() => {
    fetchWishlist();
  }, []);

  // ✅ Update liked state
  useEffect(() => {
    const product = data?.find((item) => item._id === id);
    if (Array.isArray(wishlist) && product) {
      setIsLiked(
        wishlist.some((item) => item.product?._id === product._id)
      );
    }
  }, [wishlist, data, id]);

  if (!data || data.length === 0) return <div>Loading...</div>;

  const product = data.find((item) => item._id === id);
  if (!product)
    return (
      <p className="pt-20 pl-5 text-4xl">PRODUCT NOT FOUND - ERROR 404!</p>
    );

  const offer = Math.floor(
    ((product.variants[0].oldPrice - product.variants[0].newPrice) /
      product.variants[0].oldPrice) *
      100
  );

  const handleWishlist = async () => {
    if (isLiked) {
      await removeFromWishlist(product._id);
    } else if (!wishlist.some((item) => item.product._id === product._id)) {
      await addToWishlist(product._id);
    }
    await fetchWishlist();
  };
    
  return (
    <div>
      <div className="h-16"></div>
      <div className="min-h-screen w-full bg-stone-300 flex justify-center">
        <div className="w-[92vw] h-fit mt-10 flex flex-wrap">
          <div className="flex w-[40vw] h-[85%] sticky top-28 pb-10">
            <div className="h-[80vh] w-[20%] bg-white flex flex-col justify-between">
              <div key={product.images[0]} className="h-[15vh] w-[95%] bg-slate-950" onClick={()=>setMainImg(product.images[0])} >
                <img
                  src={product.images[0]}
                  alt=""
                  className="h-[15vh] w-full bg-cover overflow-hidden"
                />
              </div>
              <div key={product.images[1]} className="h-[15vh] w-[95%] bg-slate-950" onClick={()=>setMainImg(product.images[1])}>
                <img
                  src={product.images[1]}
                  alt=""
                  className="h-[15vh] w-full bg-cover overflow-hidden"
                />
              </div>
              <div key={product.images[2]} className="h-[15vh] w-[95%] bg-slate-950" onClick={()=>setMainImg(product.images[2])}>
                <img
                  src={product.images[2]}
                  alt=""
                  className="h-[15vh] w-full bg-cover overflow-hidden"
                />
              </div>
              <div key={product.images[3]} className="h-[15vh] w-[95%] bg-slate-950" onClick={()=>setMainImg(product.images[3])}>
                <img
                  src={product.images[3]}
                  alt=""
                  className="h-[15vh] w-full bg-cover overflow-hidden"
                />
              </div>
              <div key={product.images[4]} className="h-[15vh] w-[95%] bg-slate-950" onClick={()=>setMainImg(product.images[4])}>
                <img
                  src={product.images[4]}
                  alt=""
                  className="h-[15vh] w-full bg-cover overflow-hidden"
                />
              </div>
            </div>
            <div className="h-full w-[100%] bg-red-800 relative">
            <div className="bg-gray-300 text-4xl text-gray-500 absolute top-3 right-3 w-14 h-14 pt-1 flex items-center justify-center rounded-full"><i className={`ri-heart-fill ${isLiked ? "text-red-800" : ""} cursor-pointer `}  onClick={handleWishlist}></i></div>
              <img
                src={mainImg}
                alt=""
                className="h-[80vh] w-full bg-cover overflow-hidden"
              />
            </div>
          </div>

          <div className=" w-[45vw] min-h-screen px-10 mt-2 flex flex-col">
            <div className="text-gray-500 text-xs font-normal mb-2">
              path of arrival ?
            </div>
            <div className="text-gray-800 text-base font-bold">
              {product.brand}
            </div>
            <div className="text-2xl font-semibold whitespace-normal h-fit mb-3">
              {product.name}
            </div>
            <hr className="h-[2px] bg-gray-600" />
            <div className="text-lg text-green-600 font-semibold mt-3">
              Special price
            </div>
            <div className="flex gap-3 items-end mt-1 ml-2">
              <p className="text-3xl font-semibold">₹ {selectedVariant?.newPrice}</p>
              <p className="text-lg text-gray-500 line-through">
              ₹{selectedVariant?.oldPrice}
              </p>
              <p className="text-lg text-green-600 font-semibold">{offer}% off</p>
            </div>
            <div className="mt-4">
              <p className="text-lg">Select Size : </p>
              <div className="flex gap-3 mt-2">
              {product.variants.map((variant) => (
                <div key={variant?.size} className={`h-10 px-3 bg-gray-300 flex justify-center items-center cursor-pointer ${selectedVariant?.size == variant?.size ? "bg-red-300" : ""}`} onClick={() => setSelectedVariant(variant)
                }>
                  {variant?.size}
                </div>
              ))}
              </div>
            </div>
            <div className="flex gap-5">
            <div className="mt-6 border-2 bg-orange-300 w-fit py-2 px-20 cursor-pointer" onClick={async ()=> {await addToCart(product._id,1,selectedVariant.size,selectedVariant.newPrice,selectedVariant.oldPrice) 
               navigate("/cart");
            }}>Add to cart</div>
            {/* <div className="mt-6 border-2 bg-orange-300 w-fit py-2 px-10 cursor-pointer" onClick={async ()=> {await addToCart(product._id,1,selectedVariant.size,selectedVariant.newPrice,selectedVariant.oldPrice) 
               navigate("/cart");
            }}>Buy Now</div> */}
            </div>
            <div className="mt-4 flex  flex-col gap-1">
              <p>100% Original product</p>
              <p>Cash on delivery is available on this product</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
            <div>
              <p className="text-lg font-medium mt-4">Product Description : </p>
              <p className="mt-1 text-sm w-full whitespace-normal">{product.description}</p>
            </div>
            <div className="h-fit mt-2 pb-10">
              <p className="text-2xl font-medium mt-4">Product Specifications : </p>
              {product.specifications.map((specification) => (
                <div className="flex whitespace-normal gap-5">
                  <div className="flex flex-col">
              <p className="mt-2 text-base font-medium w-56 whitespace-normal">{specification.key} :</p>
              </div>
              <div className="flex flex-col">
              <p className="mt-2 text-base w-fit whitespace-normal">{specification.value}</p>
              </div>
              </div>
              ))}

            </div>
           
          </div>
          
        </div>
      </div>
      <div className="h-min-h-screen w-full bg-stone-400">
        <div className=" mx-8">
          {/* {console.log(product.subCategory)} */}
          <RelatedProduct category={product.category?.name} subCategory={product.subCategory}/>
        </div>
      </div>
    </div>
  );
};

export default Product;
