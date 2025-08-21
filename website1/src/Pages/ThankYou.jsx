import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import confettiGif from '../assets/images/confetti.gif'; // 💡 Add your own gif here

function ThankYou() {
  return (
    <>
      <Header />

      <div style={{
        paddingTop: '100px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: '50px',
      }}>
        
        {/* 🎉 Confetti GIF */}
        <img
          src={confettiGif}
          alt="Order Success"
          style={{ width: '200px', marginBottom: '20px' }}
        />

        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#28a745',
          marginBottom: '10px',
        }}>
          ✅ Thank You for Your Purchase!
        </h1>

        <p style={{
          fontSize: '20px',
          color: '#555',
          maxWidth: '600px',
          marginBottom: '30px',
        }}>
          We’ve received your order and will begin processing it right away. You’ll receive an email confirmation shortly.
        </p>

        <Link
          to="/"
          style={{
            padding: '15px 30px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => e.target.style.background = '#0056b3'}
          onMouseOut={(e) => e.target.style.background = '#007bff'}
        >
          🏠 Continue Shopping
        </Link>
      </div>
    </>
  );
}

export default ThankYou;
