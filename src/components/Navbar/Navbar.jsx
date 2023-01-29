import React, { useEffect, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig/firebaseConfig";
import { setSignInData } from "../../redux/authSlice";
import { guestUser } from "../../redux/guestUserSlice";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart?.cart);
  const { isLogged, photo } = useSelector((state) => state.auth);
  const { guestUserLogged } = useSelector((state) => state.guestUser);

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    if (guestUserLogged) {
      dispatch(
        guestUser({
          guestUserLogged: false,
        })
      );
    }
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        dispatch(
          setSignInData({
            isLogged: true,
            name: data.displayName,
            photo: data.photoURL,
          })
        );
      } else {
        dispatch(
          setSignInData({
            isLogged: false,
            name: "",
            photo: "",
          })
        );
      }
    });
  }, [dispatch]);

  // this is used to handle toggle cart popup event at backdrop click
  const handleCartToggle = () => {
    setOpen(!open);
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".cartIcon")) {
        setOpen(false);
      }
    });
  }, [open]);

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
          <Link className="link fashion-logo" to="/">
            FASHION STORE
          </Link>
        </div>
        <div className="right">
          <div className="icons">
            {isLogged ? (
              <img className="profile-pic" src={photo} alt="profile-img" />
            ) : (
              <Link className="link" to="/login">
                <PersonOutlineOutlinedIcon />
              </Link>
            )}
            <div className="cartIcon" onClick={handleCartToggle}>
              <ShoppingCartOutlinedIcon />
              <span>{cart?.length}</span>
            </div>
          </div>
          {isLogged || guestUserLogged ? (
            <button className="signout-btn" onClick={handleSignOut}>
              Sign out
            </button>
          ) : null}
        </div>
      </div>

      {open && <Cart setOpen={setOpen} />}
    </div>
  );
};

export default Navbar;
