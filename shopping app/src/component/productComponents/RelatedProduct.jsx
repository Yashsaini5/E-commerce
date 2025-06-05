// import React, { useState, useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { DataContext } from '../../context/DataProvider';

// const RelatedProduct = ({ category, subCategory }) => {
//   const { data } = useContext(DataContext);
//   const [relatedProduct, setRelatedProduct] = useState([]);

//   useEffect(() => {
//     if (data.length > 0) {
//       let productCopy = [...data];

//       productCopy = productCopy.filter(
//         (item) => category === item.category?.name
//       );
//       productCopy = productCopy.filter(
//         (item) => subCategory === item.subCategory
//       );

//       setRelatedProduct(productCopy.slice(0, 5));
//     }
//   }, [data, category, subCategory]);

//   return (
//     <div className="py-8">
//       <h2 className="text-xl font-semibold mb-6 text-black px-4">Related Products</h2>
//       {relatedProduct?.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
//           {relatedProduct.map((product) => (
//             <div
//               key={product._id}
//               className="border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-300"
//             >
//               <Link to={`/product/${product._id}`}>
//                 <div className="h-56 overflow-hidden">
//                   <img
//                     src={product.images?.[0]}
//                     alt={product.name}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//               </Link>
//               <div className="p-3">
//                 <div className="text-sm text-gray-500">{product.brand}</div>
//                 <Link to={`/product/${product._id}`}>
//                   <h3 className="text-md font-medium text-gray-800 hover:underline line-clamp-2">
//                     {product.name}
//                   </h3>
//                 </Link>
//                 <div className="flex items-center space-x-2 mt-2">
//                   <div className="text-lg font-bold text-gray-800">
//                     ₹{product.variants?.[0]?.newPrice}
//                   </div>
//                   <div className="text-sm text-gray-400 line-through">
//                     ₹{product.variants?.[0]?.oldPrice}
//                   </div>
//                   <div className="text-sm text-green-600">
//                     {product.variants?.[0]?.oldPrice &&
//                       product.variants?.[0]?.newPrice && (
//                         <>
//                           {Math.floor(
//                             ((product.variants[0].oldPrice -
//                               product.variants[0].newPrice) /
//                               product.variants[0].oldPrice) *
//                               100
//                           )}
//                           % off
//                         </>
//                       )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No related products found.</p>
//       )}
//     </div>
//   );
// };

// export default RelatedProduct;

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const RelatedProduct = ({ category, subCategory }) => {
  const { data } = useContext(DataContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    const fetchRelated = () => {
      if (data.length === 0) return;

      const filtered = data
        .filter((item) => item.category?.name === category && item.subCategory === subCategory)
        .slice(0, 10);

      setRelatedProduct(filtered);
    };

    fetchRelated();
  }, [data, category, subCategory]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Related Products</h2>

      {relatedProduct.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {relatedProduct.map((product) => (
            <SwiperSlide key={product._id}>
              <Link
                to={`/product/${product._id}`}
                className="block border rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition-all"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-700 truncate">{product.name}</h3>
                  <p className="text-lg font-bold text-black">₹{product.variants?.[0]?.newPrice}</p>
                  <p className="text-xs text-gray-400 line-through">
                    ₹{product.variants?.[0]?.oldPrice}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No related products found</p>
      )}
    </div>
  );
};

export default RelatedProduct;
