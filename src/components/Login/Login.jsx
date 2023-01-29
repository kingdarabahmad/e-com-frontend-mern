import React, { useEffect, useState } from "react";
import "./Login.scss";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignInData, setSignOutData } from "../../redux/authSlice";
import { Alert } from "@mui/material";
import { guestUser } from "../../redux/guestUserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError("Unable to Login/Sign Up");
    }
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
        navigate("/");
      } else {
        dispatch(
          setSignOutData({
            isLogged: false,
            name: "",
            photo: "",
          })
        );
      }
    });
  }, [dispatch, navigate]);

  const handleGuestUser = () => {
    dispatch(
      guestUser({
        guestUserLogged: true,
      })
    );
  };

  return (
    <div className="outer-container">
      <div className="login-box">
        <h2>Login/Sign Up</h2>
        <button onClick={handleSignIn}>
          <div className="logo-img">
            <FcGoogle />
          </div>
          <div className="logo-text">Sign In with Google</div>
        </button>
        <h6 style={{ color: "white", textAlign: "center", padding: "6px" }}>
          To Test this Web App you can Sign in As Guest
        </h6>
        <button onClick={handleGuestUser}>
          <div className="logo-text">Sign In as Guest User</div>
        </button>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
};

export default Login;
