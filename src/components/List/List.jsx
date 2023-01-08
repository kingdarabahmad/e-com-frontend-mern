import React from "react";
import Card from "../card/Card";
import "./List.scss";

const List = ({ products, isLoading }) => {
  return (
    <div className="list">
      {isLoading
        ? "loading"
        : products?.map((item) => <Card item={item} key={item._id} />)}
    </div>
  );
};

export default List;
