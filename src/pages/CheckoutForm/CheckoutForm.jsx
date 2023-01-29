import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import validator from "validator";
import "./CheckoutForm.scss";
import { resetCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const CheckoutForm = () => {
  const [validateMsg, setValidateMsg] = useState({ error: false, msg: "" });
  const [isSuccess, setIsSuccess] = useState({ status: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState({ status: false, msg: "" });
  const { cart } = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
  });
  const navigate = useNavigate();
  const checkoutRef = useRef(null);

  //it will re-render when ever formData changes
  useEffect(() => {
    if (validator.isEmail(formData.email)) {
      setEmailError({ status: false, msg: "" });
    }
    if (
      formData.email &&
      formData.name &&
      formData.address &&
      formData.phoneNo &&
      cart.length !== 0
    ) {
      setValidateMsg({ error: false, msg: "" });
    }
  }, [
    formData.email,
    formData.name,
    formData.address,
    formData.phoneNo,
    cart.length,
  ]);

  //function will recieve form the form when input data changes
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //sumbit the form data to backend
  const handleSubmit = async () => {
    //check whether all form inputs are filled and then send post request
    if (
      formData.email &&
      validator.isEmail(formData.email) &&
      formData.name &&
      formData.address &&
      formData.phoneNo &&
      cart.length !== 0
    ) {
      setIsLoading(true);
      const result = await fetch(
        "https://better-wear-pike.cyclic.app/ship/checkout",
        {
          method: "POST",
          body: JSON.stringify({ cart, ...formData }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const { message } = await result.json();
      setFormData({ name: "", email: "", address: "", phoneNo: "" });
      dispatch(resetCart());
      setIsSuccess({ status: true, msg: message });
      setIsLoading(false);
      //redirect to home page after 5s
      setTimeout(() => {
        navigate("/");
      }, 10000);
    } else {
      setValidateMsg({
        error: true,
        msg: "All field are required or Cart is Empty",
      });
      setEmailError({ status: "true", msg: "Enter a Valid Email" });
    }
  };

  //function calculate cart Totol amount
  const cartSubTotal = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  //useEffect to bring checkout into View

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [checkoutRef, isSuccess]);

  return (
    <div className="checkoutContainer" ref={checkoutRef}>
      <div className="orderDetails">
        {isSuccess.status ? (
          <>
            <h3>Thank you for shopping with us</h3>
            <h4>{isSuccess.msg}</h4>
          </>
        ) : (
          <>
            <h4>Order Details</h4>
            <div className="top">
              {cart?.map((item) => (
                <div key={item.id}>
                  <div className="rows" key={item.id}>
                    <h5>{item?.title}</h5>
                    <span>
                      {item?.quantity}X ₹{item?.price}
                    </span>
                  </div>
                </div>
              ))}
              <span className="subtotal">SUBTOTAL: ₹{cartSubTotal()}</span>
            </div>
          </>
        )}
      </div>
      <div className="checkout-form">
        <h4>Enter your Shipping Details</h4>
        <input
          type="text"
          name="name"
          value={formData.name}
          id="name"
          placeholder="Name"
          onChange={handleFormData}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          id="email"
          placeholder="Email"
          onChange={handleFormData}
        />
        {emailError.status && <Alert severity="error">{emailError.msg}</Alert>}
        <textarea
          name="address"
          id=""
          cols="10"
          value={formData.address}
          rows="2"
          placeholder="Enter your Address"
          onChange={handleFormData}
        />
        <input
          type="text"
          name="phoneNo"
          value={formData.phoneNo}
          id="phoneNo"
          placeholder="Phone Number"
          onChange={handleFormData}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <input
            className="btn"
            type="button"
            value="Confirm your order"
            onClick={handleSubmit}
          />
        )}
        {validateMsg.error && <Alert severity="error">{validateMsg.msg}</Alert>}
      </div>
    </div>
  );
};

export default CheckoutForm;
