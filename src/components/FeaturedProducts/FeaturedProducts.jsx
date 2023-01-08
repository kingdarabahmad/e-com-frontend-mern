import React, { useEffect, useState } from "react";
import "./FeaturedProducts.scss";
import Card from "../card/Card";

const FeaturedProducts = ({ type }) => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      let data = await fetch(`https://better-wear-pike.cyclic.app/products/?type=${type}`);
      let result = await data.json();
      setProducts(result);
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
        {products.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
