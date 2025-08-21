import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function Checkout() {
  const {
    cartItems,
    buyNowItem,
    setCartItems,
    setBuyNowItem
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [quantities, setQuantities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'cod',
    billingSame: true,
    deliveryMethod: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    billingName: '',
    billingAddress: '',
    billingCity: '',
    billingZip: ''
  });

  useEffect(() => {
    if (buyNowItem) {
      setQuantities([1]);
    } else {
      setQuantities(cartItems.map(() => 1));
    }
  }, [cartItems, buyNowItem]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleQuantityChange = (index, value) => {
    const updated = [...quantities];
    updated[index] = parseInt(value) || 1;
    setQuantities(updated);
  };

  const getDeliveryCharge = () => {
    if (formData.deliveryMethod === 'standard') return 200;
    if (formData.deliveryMethod === 'express') return 500;
    return 0;
  };

  const getTotal = () => {
    const subtotal = buyNowItem
      ? buyNowItem.price * (quantities[0] ?? 1)
      : cartItems.reduce((total, item, i) => total + item.price * (quantities[i] ?? 1), 0);
    return subtotal + getDeliveryCharge();
  };

  const handleOrder = async () => {
    const {
      name, email, address, city, zip,
      paymentMethod, cardNumber, expiry, cvv,
      billingSame, billingAddress, billingCity, billingZip,
      deliveryMethod
    } = formData;

    if (!name || !email || !address || !city || !zip || !deliveryMethod) {
      alert("⚠️ Please fill out all required fields including delivery method.");
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !expiry || !cvv)) {
      alert("⚠️ Please fill out all card details.");
      return;
    }

    if (!billingSame && (!billingAddress || !billingCity || !billingZip)) {
      alert("⚠️ Please fill out billing address.");
      return;
    }

    const orderData = {
      user: {
        name,
        email,
        shippingAddress: { address, city, zip },
        billingAddress: billingSame
          ? { address, city, zip }
          : {
              address: billingAddress,
              city: billingCity,
              zip: billingZip,
            },
      },
      items: buyNowItem
        ? [{
            text: buyNowItem.text,
            price: buyNowItem.price,
            quantity: quantities[0],
          }]
        : cartItems.map((item, i) => ({
            text: item.text,
            price: item.price,
            quantity: quantities[i] ?? 1,
          })),
      payment: {
        method: paymentMethod,
        ...(paymentMethod === 'card' && { cardNumber, expiry, cvv }),
      },
      deliveryMethod,
      deliveryCharge: getDeliveryCharge(),
      total: getTotal(),
      timestamp: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      alert("✅ Order successfully placed and saved in Firestore!");
      setCartItems([]);
      setBuyNowItem(null);
      navigate('/thankyou');
    } catch (error) {
      console.error("❌ Error saving order:", error);
      alert("❌ Failed to place order. Try again.");
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '120px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
          {/* Shipping Form */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3>Shipping Details</h3>
            <input type="text" name="name" placeholder="Full Name" onChange={handleInput} style={inputStyle} />
            <input type="email" name="email" placeholder="Email" onChange={handleInput} style={inputStyle} />
            <input type="text" name="address" placeholder="Address" onChange={handleInput} style={inputStyle} />
            <input type="text" name="city" placeholder="City" onChange={handleInput} style={inputStyle} />
            <input type="text" name="zip" placeholder="ZIP Code" onChange={handleInput} style={inputStyle} />

            <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
              Choose Delivery Method:
            </label>
            <select name="deliveryMethod" onChange={handleInput} style={inputStyle}>
              <option value="">-- Select --</option>
              <option value="standard">Standard (200 PKR)</option>
              <option value="express">Express (500 PKR)</option>
            </select>

            <h4 style={{ marginTop: '20px' }}>💳 Payment</h4>
            <p style={{ color: '#888', fontSize: '13px' }}>All transactions are secure and encrypted.</p>

            <div style={radioGroupStyle}>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInput}
                />
                Cash on Delivery (COD)
              </label>

              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInput}
                />
                Credit / Debit Card
                <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" />
              </label>

              {formData.paymentMethod === 'card' && (
                <div style={{ marginTop: '10px' }}>
                  <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleInput} style={inputStyle} />
                  <input type="text" name="expiry" placeholder="MM/YY" onChange={handleInput} style={inputStyle} />
                  <input type="text" name="cvv" placeholder="CVV" onChange={handleInput} style={inputStyle} />
                </div>
              )}
            </div>

            <h4 style={{ marginTop: '25px' }}>🏠 Billing Address</h4>
            <div style={radioGroupStyle}>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="billingSame"
                  value="true"
                  checked={formData.billingSame === true}
                  onChange={() => setFormData((prev) => ({ ...prev, billingSame: true }))}
                />
                Same as shipping address
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="billingSame"
                  value="false"
                  checked={formData.billingSame === false}
                  onChange={() => setFormData((prev) => ({ ...prev, billingSame: false }))}
                />
                Use a different billing address
              </label>

              {!formData.billingSame && (
                <div style={{ marginTop: '10px' }}>
                  <input type="text" name="billingName" placeholder="Billing Name" onChange={handleInput} style={inputStyle} />
                  <input type="text" name="billingAddress" placeholder="Billing Address" onChange={handleInput} style={inputStyle} />
                  <input type="text" name="billingCity" placeholder="Billing City" onChange={handleInput} style={inputStyle} />
                  <input type="text" name="billingZip" placeholder="Billing ZIP" onChange={handleInput} style={inputStyle} />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3>🛍️ Order Summary</h3>
            <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', background: '#fafafa' }}>
              {buyNowItem ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <img src={buyNowItem.image} alt={buyNowItem.text} style={productImageStyle} />
                  <div>
                    <p>{buyNowItem.text}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <label>Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={quantities[0] ?? 1}
                        onChange={(e) => handleQuantityChange(0, e.target.value)}
                        style={qtyInputStyle}
                      />
                      <span>
                        x ${buyNowItem.price.toFixed(2)} = ${(buyNowItem.price * (quantities[0] ?? 1)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>
                    <img src={item.image} alt={item.text} style={productImageStyle} />
                    <div>
                      <p>{item.text}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label>Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={quantities[index] ?? 1}
                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                          style={qtyInputStyle}
                        />
                        <span>
                          x ${item.price.toFixed(2)} = ${(item.price * (quantities[index] ?? 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <h4 style={{ marginTop: '20px' }}>
                Delivery: {getDeliveryCharge()} PKR
              </h4>

              <h4>Total: ${getTotal().toFixed(2)}</h4>

              <button onClick={handleOrder} style={checkoutButtonStyle}>
                ✅ Complete Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const qtyInputStyle = {
  width: '60px',
  padding: '4px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  textAlign: 'center',
};

const checkoutButtonStyle = {
  marginTop: '20px',
  padding: '12px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
  fontSize: '16px',
};

const radioGroupStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  marginTop: '10px',
  backgroundColor: '#fff',
};

const radioLabelStyle = {
  display: 'block',
  marginBottom: '10px',
  cursor: 'pointer',
};

const productImageStyle = {
  width: '70px',
  height: '70px',
  objectFit: 'cover',
  borderRadius: '8px',
};

export default Checkout;
