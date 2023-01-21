  import React from "react";
import "./Cart.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state?.cart);

  const cartSubTotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };
  return (
    <div className="cart">
      <div className="cartRmvBtn" onClick={() => setOpen(false)}>
        X
      </div>
      <h1>Products in your cart</h1>
      {cart?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item?.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <div className="price">
              {item?.quantity} X ₹{item?.price}
            </div>
          </div>
          <DeleteOutlineIcon
            className="delete"
            onClick={() => dispatch(removeItem(item?.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>₹{cartSubTotal()}</span>
      </div>
      <Link  to="/checkoutform" className="link"> 
      <button>PROCEED TO CHECKOUT</button>
      </Link>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset cart
      </span>
    </div>
  );
};

export default Cart;
