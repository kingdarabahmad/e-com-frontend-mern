import React, { useEffect, useState } from "react";
import "./Product.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BalanceIcon from "@mui/icons-material/Balance";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      let result = await fetch(`https://better-wear-pike.cyclic.app/products/${id}`);
      let { data } = await result.json();
      setProduct(data);
      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="product">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={product.img}
                alt=""
                onClick={() => setSelectedImg("img")}
              />
              <img
                src={product.img2}
                alt=""
                onClick={() => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              {product ? <img src={product[selectedImg]} alt="" /> : " "}
            </div>
          </div>
          <div className="right">
            <h1>{product.title}</h1>
            <span className="price">₹{product?.price}</span>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product._id,
                    title: product.title,
                    price: product.price,
                    img: product.img,
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="link">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
