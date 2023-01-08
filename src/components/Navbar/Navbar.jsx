import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [opac, setOpac] = useState(0);
  const [trans, setTrans] = useState(-400);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [show, setShow] = useState(true);
  const cart = useSelector((state) => state.cart?.cart);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
    if (windowSize <= 501) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [windowSize]);

  const handleMenu = () => {
    setOpac((prev) => {
      if (prev === 1) {
        return 0;
      }
      if (prev === 0) {
        return 1;
      }
    });
    setTrans((prev) => {
      if (prev === -400) {
        return 0;
      }
      if (prev === 0) {
        return -400;
      }
    });
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <Link className="link" to="/products/2">
              Women
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/1">
              Men
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/3">
              Children
            </Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">
            FASHION STORE
          </Link>
        </div>
        {windowSize <= 501 ? (
          <MenuIcon className="menuIcon" onClick={handleMenu} />
        ) : (
          <div className="right">
            <div className="item">
              <Link className="link" to="/">
                Homepage
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/">
                About
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/">
                Contact
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/">
                Stores
              </Link>
            </div>

            <div className="icons">
              <SearchIcon />
              <PersonOutlineOutlinedIcon />
              <FavoriteBorderOutlinedIcon />
              <div className="cartIcon" onClick={() => setOpen(!open)}>
                <ShoppingCartOutlinedIcon />
                <span>{cart?.length}</span>
              </div>
            </div>
          </div>
        )}
        {show && (
          <div
            className="right"
            style={{ opacity: `${opac}`, transform: `translateY(${trans}%)` }}
          >
            <div className="item">
              <Link className="link" to="/">
                Homepage
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/">
                About
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/">
                Contact
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/">
                Stores
              </Link>
            </div>

            <div className="icons">
              <SearchIcon />
              <PersonOutlineOutlinedIcon />
              <FavoriteBorderOutlinedIcon />
              <div className="cartIcon" onClick={() => setOpen(!open)}>
                <ShoppingCartOutlinedIcon />
                <span>{cart?.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {open && <Cart setOpen={setOpen} />}
    </div>
  );
};

export default Navbar;
