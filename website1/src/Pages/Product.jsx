import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header';

import Product1 from "../assets/images/Product-1.jpg";
import Product2 from "../assets/images/product-2.jpg";
import Product3 from "../assets/images/product-3.jpg";
import Product4 from "../assets/images/product-4.jpg";
import Product5 from "../assets/images/product-5.jpg";
import Product6 from "../assets/images/product-6.jpg";
import Product7 from "../assets/images/product-7.jpg";
import Product8 from "../assets/images/product-8.jpg";
import Product9 from "../assets/images/product-9.jpg";

function Product() {
  const navigate = useNavigate();
  const {
    addToCart,
    setBuyNowItem,
    wishlistItems,
    addToWishlist
  } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { text: 'Elegant leather bag.', image: Product1, price: 49.99, description: "A beautiful leather bag." },
    { text: 'Classic black style.', image: Product2, price: 59.99, description: "Classic black design." },
    { text: 'Spacious and strong.', image: Product3, price: 39.99, description: "Very strong bag." },
    { text: 'Perfect for travel.', image: Product4, price: 69.99, description: "Best for traveling." },
    { text: 'Modern and durable.', image: Product5, price: 44.99, description: "Durable and modern." },
    { text: 'Premium quality.', image: Product6, price: 54.99, description: "Premium quality product." },
    { text: 'Stylish for college.', image: Product7, price: 34.99, description: "Perfect for college students." },
    { text: 'Elegant design.', image: Product8, price: 64.99, description: "Elegant and fancy." },
    { text: 'Perfect for office.', image: Product9, price: 74.99, description: "Use for office." },
  ];

  const filteredProducts = products.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />

      {/* 🔍 Search Bar - moved to right */}
      <div style={{ marginTop: '90px', paddingRight: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <input
          type="text"
          placeholder="Search bags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '30px'
          }}
        />
      </div>

      {/* 👜 Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {filteredProducts.map((item, index) => {
          const isWishlisted = wishlistItems.find(p => p.text === item.text);

          return (
            <div
              key={index}
              style={{
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
                textAlign: 'center',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              {/* ❤️ Wishlist Icon */}
              <div
                onClick={() => addToWishlist(item)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: isWishlisted ? 'red' : '#ccc',
                  zIndex: 1,
                }}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                ♥
              </div>

              <Link to={`/product/${index}`} state={{ product: item }}>
                <img
                  src={item.image}
                  alt={`product-${index}`}
                  style={{
                    width: '100%',
                    height: '280px',
                    objectFit: 'contain',
                  }}
                />
              </Link>

              <div style={{ padding: '15px' }}>
                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.text}</p>
                <p style={{ color: '#444' }}>${item.price.toFixed(2)}</p>

                {/* ✅ Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                  <button
                    onClick={() => addToCart(item, 1)}
                    style={buttonStyle('#000', '#fff')}
                    onMouseEnter={(e) => hoverStyle(e, '#fff', '#000')}
                    onMouseLeave={(e) => hoverStyle(e, '#000', '#fff')}
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => {
                      setBuyNowItem(item);
                      navigate("/checkout");
                    }}
                    style={buttonStyle('#007bff', '#fff')}
                    onMouseEnter={(e) => hoverStyle(e, '#fff', '#007bff')}
                    onMouseLeave={(e) => hoverStyle(e, '#007bff', '#fff')}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 🔘 Button Helpers
const buttonStyle = (bg, color) => ({
  background: bg,
  color: color,
  padding: '8px 14px',
  border: `2px solid ${bg}`,
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.3s ease',
});

const hoverStyle = (e, bg, color) => {
  e.target.style.background = bg;
  e.target.style.color = color;
  e.target.style.boxShadow = '0 0 8px rgba(0,0,0,0.2)';
};

export default Product;
