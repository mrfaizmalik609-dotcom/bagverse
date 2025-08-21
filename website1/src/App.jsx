import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import About from "./Pages/About";
import Login from "./Pages/login";
import Cart from "./Pages/Cart";
import { CartProvider } from "./context/CartContext"; // ✅ correct import
import Contact from "./Pages/Contact";
import Signup from "./Pages/Signup";
import Singleproduct from "./Pages/Singleproduct";
import Checkout from "./Pages/Checkout";
import Thankyou from "./Pages/Thankyou";
import Forgetpassword from "./Pages/Forgetpassword";
import Wishlist from "./Pages/Wishlist";


function App() {
  return (
    <CartProvider> {/* ✅ Wrap entire app in provider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Contact" element={<Contact/>} />
          <Route path="/Signup" element={<Signup/>}/>
        <Route path="/product/:id" element={<Singleproduct />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Thankyou" element={<Thankyou />}/>
       <Route path="/forgot-password" element={<Forgetpassword />} />
       <Route path="/Wishlist" element={<Wishlist/>}/>

        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
