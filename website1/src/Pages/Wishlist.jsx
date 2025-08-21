import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header';

function Wishlist() {
  const { wishlistItems, addToCart } = useContext(CartContext);

  return (
    <div>
      <Header />
      <div style={{ marginTop: '90px', padding: '20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px' }}>Your Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {wishlistItems.map((item, index) => (
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
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ padding: '10px', fontWeight: 'bold' }}>#{index + 1}</div>
                <img
                  src={item.image}
                  alt={item.text}
                  style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                />
                <div style={{ padding: '15px' }}>
                  <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.text}</p>
                  <p style={{ color: '#555' }}>${item.price.toFixed(2)}</p>

                  {/* ✅ Add to Cart Button */}
                  <button
                    onClick={() => addToCart(item, 1)}
                    style={{
                      background: '#000',
                      color: '#fff',
                      padding: '8px 14px',
                      border: 'none',
                      borderRadius: '6px',
                      marginTop: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#fff';
                      e.target.style.color = '#000';
                      e.target.style.border = '1px solid #000';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#000';
                      e.target.style.color = '#fff';
                      e.target.style.border = 'none';
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
