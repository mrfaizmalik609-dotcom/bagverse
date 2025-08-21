import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Product from "./Pages/Product";           // ✅ Product.jsx
import SingleProduct from "./Pages/SingleProduct"; // ✅ SingleProduct.jsx
import About from "./Pages/About";
import Login from "./Pages/Login";               // ✅ Login.jsx
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Signup from "./Pages/Signup";
import Checkout from "./Pages/Checkout";
import ThankYou from "./Pages/ThankYou";         // ✅ ThankYou.jsx
import ForgetPassword from "./Pages/ForgetPassword"; // ✅ ForgetPassword.jsx
import Wishlist from "./Pages/Wishlist";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
