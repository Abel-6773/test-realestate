import React from "react";
import { NavLink } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg?react";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg?react";
import MultipleListingSlider from "../Components/Features/MultipleListingSlider";

export default function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        <MultipleListingSlider />
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <NavLink to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for rent</p>
          </NavLink>
          <NavLink to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for sale</p>
          </NavLink>
        </div>
      </main>
    </div>
  );
}
