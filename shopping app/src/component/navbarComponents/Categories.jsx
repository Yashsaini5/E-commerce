import React from "react";
import { Link } from "react-router-dom";
import HomeCategories from "../homeComponents/HomeCategories";
import FashionCategory from '../homeComponents/FashionCategory'
import PhoneCategory from '../homeComponents/PhoneCategory '
import LaptopCategory from '../homeComponents/LaptopCategory'

const categories = () => {
  const categories = [
    { name: "Fashion", slug: "fashion", image: "fashionImage" },
    { name: "Electronics", slug: "electronics", image: "electronicsImage" },
    { name: "Gaming", slug: "gaming", image: "gamingImage" },
    // Add more categories as needed
  ];

  return (
    <div>
      <div className="h-16"></div>
      <HomeCategories />
      <FashionCategory />
      <PhoneCategory />
      <LaptopCategory />
    </div>
  );
};

export default categories;
