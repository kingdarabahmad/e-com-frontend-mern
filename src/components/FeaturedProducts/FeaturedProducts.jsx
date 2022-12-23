import React, { useState } from "react";
import "./FeaturedProducts.scss";
import Card from "../card/Card";
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({ type }) => {
  const { products, isLoading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>All {type} Products for Men, Women and Children</p>
      </div>
      <div className="bottom">
        {error
          ? "something went wrong"
          : isLoading
          ? "loading"
          : products.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
