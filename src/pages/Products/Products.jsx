import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import "./Products.scss";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [maxPriceValue, setMaxPriceValue] = useState(10000);
  const [sort, setSort] = useState(" ");
  const [selectedSubCat, setSelectedSubCat] = useState([]);
  const [show, setShow] = useState(-100);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [subCatData, setSubCatData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const rightRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelectedSubCat(
      isChecked
        ? [...selectedSubCat, value]
        : selectedSubCat.filter((item) => item !== value)
    );
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, [windowSize]);

  const handleShow = () => {
    if (windowSize <= 501) {
      setShow(0);
    }
  };
  const handleUnshow = () => {
    if (windowSize <= 501) {
      setShow(-100);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      let result = await fetch(
        `https://better-wear-pike.cyclic.app/subcat/subcategories`
      );
      let result2 = await fetch(
        `https://better-wear-pike.cyclic.app/cat/categories`
      );
      let result3 = await fetch(
        `https://better-wear-pike.cyclic.app/cat/categories/${catId}?subcategory=${selectedSubCat}&price=${maxPriceValue}`
      );

      let subCatData = await result.json();
      let catData = await result2.json();
      let { productsData } = await result3.json();
      setSubCatData(subCatData);
      setCatData(catData);
      setProducts(productsData);
      setIsLoading(false);
    };
    fetchProducts();
  }, [catId, selectedSubCat, maxPriceValue]);

  const handleSort = (e) => {
    setSort(e.target.value);
    if (e.target.value === "asc") {
      const sortedProducts = products.sort((a, b) => {
        return a.price - b.price;
      });
      setProducts(sortedProducts);
    }
    if (e.target.value === "desc") {
      const sortedProducts = products.sort((a, b) => {
        return b.price - a.price;
      });
      setProducts(sortedProducts);
    }
  };

  const handleMaxPrice = () => {
    setMaxPriceValue(maxPrice);
  };

  //useEffect to bring right div to view
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [rightRef]);

  return (
    <div className="products">
      <div onClick={handleShow}>
        <DoubleArrowIcon className="showFilter" />
      </div>
      <div className="left" style={{ transform: `translate(${show}%)` }}>
        <div className="removebtn" onClick={handleUnshow}>
          X
        </div>
        <div className="filterItems">
          <h2>Product Categories</h2>
          {subCatData.map((item) => (
            <div className="inputItem" key={item?.subCatNo}>
              <input
                type="checkbox"
                id={item?.subCatNo}
                value={item?.subCatNo}
                onChange={handleChange}
              />
              <label htmlFor={item?.subCatNo}>{item?.title}</label>
            </div>
          ))}
        </div>
        <div className="filterItems">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={4000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
            <br />
            <button onClick={handleMaxPrice}>Apply filter</button>
          </div>
        </div>
        <div className="filterItems">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={handleSort}
            />
            <label>Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={handleSort}
            />
            <label>Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right" ref={rightRef}>
        <img
          className="catImg"
          src={catData[catId - 1]?.img}
          alt="categoryImg"
        />
        <List
          catId={catId}
          products={products}
          isLoading={isLoading}
          sort={sort}
        />
      </div>
    </div>
  );
};

export default Products;
