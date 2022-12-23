import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Children</span>
          <span>Shoes</span>
          <span>Accesories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            Fashion Store deals with the trending and featured clothes for Men,
            Women and Children.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            M/63, Abulfazal Enclave-1, jamia nagar, okhla, New-Delhi (110025)
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">Fashion Store</span>
          <span className="copyright">
            &copy; Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="./images/payment.png" alt="paymentImg" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
