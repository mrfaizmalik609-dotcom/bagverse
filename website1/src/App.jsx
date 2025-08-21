import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

// Pages (All with .jsx extensions)
import Home from "./Pages/Home.jsx";
import TempProduct from "./Pages/TempProduct.jsx";
import SingleProduct from "./Pages/SingleProduct.jsx";
import About from "./Pages/About.jsx";
import Login from "./Pages/Login.jsx";
import Cart from "./Pages/Cart.jsx";
import Contact from "./Pages/Contact.jsx";
import Signup from "./Pages/Signup.jsx";
import Checkout from "./Pages/Checkout.jsx";
import ThankYou from "./Pages/ThankYou.jsx";
import ForgetPassword from "./Pages/ForgetPassword.jsx";
import Wishlist from "./Pages/Wishlist.jsx";

import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<TempProduct />} />
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
      </Router>
    </CartProvider>
  );
}

export default App;