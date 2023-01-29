import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import CheckoutForm from "./pages/CheckoutForm/CheckoutForm";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";

function App() {
  const { isLogged } = useSelector((state) => state?.auth);
  const { guestUserLogged } = useSelector((state) => state?.guestUser);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isLogged || guestUserLogged ? <Home /> : <Login />}
        />
        <Route
          path="/products/:id"
          element={isLogged || guestUserLogged ? <Products /> : <Login />}
        />
        <Route
          path="/product/:id"
          element={isLogged || guestUserLogged ? <Product /> : <Login />}
        />
        <Route
          path="/checkoutform"
          element={isLogged || guestUserLogged ? <CheckoutForm /> : <Login />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
