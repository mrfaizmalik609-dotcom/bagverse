import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { auth } from '../Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Header() {
  const { cartItems, lastAddedMessage, wishlistItems = [] } = useContext(CartContext);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="fixed-top w-100 text-white" style={{ backgroundColor: '#0a0f2c', zIndex: 999 }}>
      {/* 🔥 Custom Hover Styles */}
      <style>
        {`
          .nav-link-custom {
            position: relative;
            transition: color 0.3s ease;
            text-decoration: none;
          }

          .nav-link-custom:hover {
            color: #d4af37 !important;
            text-decoration: underline;
          }
        `}
      </style>

      <div className="container-fluid d-flex justify-content-between align-items-center py-4 px-3 position-relative">

        {/* 🔗 Logo */}
        <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
          <h2 className="m-0" style={{ fontSize: '22px', whiteSpace: 'nowrap', color: '#d4af37' }}>
            👜 𝔹𝔸𝔾 𝕍𝔼ℝ𝕊𝔼
          </h2>
        </Link>

        {/* 🍔 Hamburger */}
        <div className="d-md-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ cursor: 'pointer' }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
            alt="menu"
            style={{ width: '28px', height: '28px', filter: 'invert(1)' }}
          />
        </div>

        {/* 🖥️ Desktop Nav */}
        <nav className="d-none d-md-flex align-items-center justify-content-between w-100 ms-3">
          <div className="d-flex justify-content-center flex-grow-1">
            <Link to="/" className="text-white mx-3 nav-link-custom">𝓗𝓸𝓶𝓮</Link>
            <Link to="/product" className="text-white mx-3 nav-link-custom">𝓟𝓻𝓸𝓭𝓾𝓬𝓽</Link>
            <Link to="/about" className="text-white mx-3 nav-link-custom">𝓐𝓫𝓸𝓾𝓽</Link>
            <Link to="/contact" className="text-white mx-3 nav-link-custom">𝓒𝓸𝓷𝓽𝓪𝓬𝓽</Link>
          </div>

          {/* 🔍 🛒 ❤️ 👤 */}
          <div className="d-flex align-items-center gap-3">

            {/* 🔍 Search */}
            <span style={{ cursor: 'pointer' }} onClick={() => setShowSearch(!showSearch)}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                alt="Search"
                style={{ width: '22px', height: '22px', filter: 'invert(1)' }}
              />
            </span>

            {/* 🛒 Cart */}
            <div style={{ position: 'relative' }}>
              <Link to="/cart" className="text-white">🛒</Link>
              {cartItems.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                }}>{cartItems.length}</span>
              )}
            </div>

            {/* ❤️ Wishlist */}
            <div style={{ position: 'relative' }}>
              <Link to="/wishlist" className="text-white">❤️</Link>
              {wishlistItems.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  background: 'gold',
                  color: '#000',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                }}>{wishlistItems.length}</span>
              )}
            </div>

            {/* 👤 Login Icon */}
            {!user && (
              <Link to="/login" title="Login">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                  alt="Login"
                  style={{ width: '28px', height: '28px', filter: 'invert(1)' }}
                />
              </Link>
            )}

            {/* 🔓 Logout Button */}
            {user && (
              <button
                onClick={handleLogout}
                className="btn btn-danger"
                style={{
                  border: 'none',
                  padding: '6px 15px',
                  fontSize: '14px',
                  lineHeight: '1',
                }}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* 📱 Mobile Nav */}
      {mobileMenuOpen && (
        <div className="d-md-none bg-dark text-white text-center pb-3">
          <Link to="/" className="d-block py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/product" className="d-block py-2" onClick={() => setMobileMenuOpen(false)}>Products</Link>
          <Link to="/about" className="d-block py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" className="d-block py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-primary my-2"
              style={{ border: 'none', width: '75%' }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="d-block py-2" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          )}
          <Link to="/cart" className="d-block py-2" onClick={() => setMobileMenuOpen(false)}>🛒 Cart ({cartItems.length})</Link>
          <Link to="/wishlist" className="d-block py-2" onClick={() => setMobileMenuOpen(false)}>❤️ Wishlist ({wishlistItems.length})</Link>
        </div>
      )}

      {/* 🔍 Search Box */}
      {showSearch && (
        <div className="container-fluid px-3 pb-3">
          <input
            type="text"
            placeholder="Search products..."
            style={{
              backgroundColor: '#ffffffee',
              border: '1px solid #ccc',
              padding: '10px 15px',
              borderRadius: '6px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
              width: '100%',
              color: '#000',
            }}
          />
        </div>
      )}

      {/* 🛒 Toast */}
      {lastAddedMessage && (
        <div style={{
          position: 'absolute',
          top: '70px',
          right: '20px',
          backgroundColor: '#28a745',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          zIndex: 1000,
          fontSize: '14px',
        }}>
          {lastAddedMessage}
        </div>
      )}
    </header>
  );
}

export default Header;
