// src/Pages/About.jsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
  return (
    <div>
      <Header />

      {/* 🟡 Hero Section */}
      <div
        style={{
          paddingTop: '100px', // ⬅️ extra top padding to clear the fixed Header
           backgroundColor: '#fff',
          paddingBottom: '60px',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '40px 20px',
            lineHeight: '1.8',
          }}
        >
          <h1
            style={{
              fontSize: '42px',
              fontWeight: 'bold',
              marginBottom: '22px',
              color: '#0a0f2c',
              fontStyle: 'italic',
            }}
          >
            About <span style={{ color: '#d4af37' }}>BagVerse</span>
          </h1>

          <p
            style={{
              fontSize: '18px',
              color: '#333',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            At <strong>BagVerse</strong>, we believe your bag should be more than just a carrier — it's a statement.
            From minimalist leather styles to travel-ready backpacks, our collection blends quality with design
            to match your lifestyle.
          </p>

          <p
            style={{
              fontSize: '18px',
              color: '#555',
              marginTop: '20px',
              maxWidth: '800px',
              margin: '20px auto 0',
            }}
          >
            Founded with a passion for both fashion and function, we aim to deliver bags that are durable,
            affordable, and always on-trend. Whether you're off to work, class, or a new adventure —
            we’ve got the perfect bag for you.
          </p>

          <p
            style={{
              fontSize: '18px',
              color: '#666',
              marginTop: '30px',
              fontStyle: 'italic',
            }}
          >
            Thank you for being a part of our journey.
            <br />
            — The BagVerse Team
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
