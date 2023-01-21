import React, { useEffect, useState } from "react";
import "./FeaturedProducts.scss";
import Card from "../card/Card";
import Loader from "../Loader/Loader";

const FeaturedProducts = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      let data = await fetch(
        `https://better-wear-pike.cyclic.app/prod/products/?type=${type}`
      );
      let result = await data.json();
      setProducts(result);
      setIsLoading(false);
    };
    fetchProducts();
  }, [type]);

  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>All {type} Products for Men, Women and Children</p>
      </div>
      <div className="bottom">
        {isLoading ? (
          <Loader />
        ) : (
          products.map((item) => <Card item={item} key={item._id} />)
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
