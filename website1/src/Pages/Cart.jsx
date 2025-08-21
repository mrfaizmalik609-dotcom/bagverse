import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { CartContext } from '../context/CartContext';

function Cart() {
  const {
    cartItems,
    setCartItems,
    setBuyNowItem,
    setBuyNowQuantity,
  } = useContext(CartContext);

  const handleQuantityChange = (index, value) => {
    const updatedItems = [...cartItems];
    const newQty = Math.max(1, parseInt(value) || 1);
    updatedItems[index].quantity = newQty;
    setCartItems(updatedItems);
  };

  const handleRemove = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleProceedToCheckout = () => {
    setBuyNowItem(null);
    setBuyNowQuantity(1);
  };

  return (
    <>
      <Header />
      <div style={{ padding: '100px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>🛒 My Cart</h2>

        {cartItems.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: '300px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    textAlign: 'center',
                    backgroundColor: '#fff'
                  }}
                >
                  <img
                    src={item.image}
                    alt={`cart-${index}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      maxHeight: '300px'
                    }}
                  />

                  <div style={{ padding: '15px' }}>
                    <p style={{ fontWeight: 'bold' }}>{item.text}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>

                    <div style={{ marginTop: '10px' }}>
                      Quantity:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        style={{ width: '60px', marginLeft: '10px', textAlign: 'center' }}
                      />
                    </div>

                    <p style={{ marginTop: '10px', color: '#28a745' }}>
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      onClick={() => handleRemove(index)}
                      style={{
                        marginTop: '10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '50px', textAlign: 'center' }}>
              <h3 style={{ color: '#333' }}>
                🧾 Subtotal: ${getTotalAmount().toFixed(2)}
              </h3>
              <Link to="/checkout">
                <button
                  onClick={handleProceedToCheckout}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '12px 30px',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginTop: '30px'
                  }}
                >
                  ✅ Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
