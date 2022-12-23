import React from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../card/Card";
import "./List.scss";

const List = ({ catId, subCat, maxPrice, sort }) => {
  const { products, isLoading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCat.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );
  return (
    <div className="list">
      {isLoading
        ? "loading"
        : products?.map((item) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default List;
