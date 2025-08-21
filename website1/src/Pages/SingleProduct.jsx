import React, { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import { CartContext } from '../context/CartContext';

function SingleProduct() {
  const { addToCart } = useContext(CartContext);
  const { state } = useLocation();
  const [quantity, setQuantity] = useState(1);

  const product = state?.product;

  if (!product) {
    return (
      <div style={{ paddingTop: '140px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/product" style={{ color: 'blue', textDecoration: 'underline' }}>
          Go back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div>
      <Header />
      <div style={{
        paddingTop: '140px',
        paddingBottom: '40px',
        paddingLeft: '20px',
        paddingRight: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <img
          src={product.image}
          alt={product.text}
          style={{
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '12px',
            backgroundColor: '#fff'
          }}
        />

        <h2 style={{ marginTop: '20px', fontSize: '24px' }}>{product.text}</h2>
        
        <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
          ${ (product.price * quantity).toFixed(2) }
          <span style={{ fontSize: '14px', color: '#777' }}> (${product.price.toFixed(2)} each)</span>
        </p>

        <p style={{ color: '#666', maxWidth: '600px', margin: '10px auto 20px' }}>
          {product.description || 'No description available.'}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              style={{
                width: '60px',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                textAlign: 'center',
              }}
            />
          </div>
          <button
            onClick={handleAddToCart}
            style={{
              padding: '10px 20px',
              backgroundColor: '#000',
              color: '#fff',
              border: '2px solid #000',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
